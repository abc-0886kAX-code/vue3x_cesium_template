/*
 * @FilePath: \明湖大屏\src\internal\service\index.js
 * @Author: maggot-code
 * @Date: 2022-12-04 00:42:53
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-12-28 09:24:23
 * @Description: 
 */
import { ResponseEntity } from "~/service/entity/Response";
import { NormServiceProps } from "~/service/shread/constant";
import { mergeObject } from "~/shared/merge";
import { transBoolean, transArray } from "~/shared/trans";
import { isMock } from "~/mock";

export function defineService(tofetch, props) {
    // entity => ResponseEntity
    function send(entity, extend) {
        const controller = new AbortController();
        const config = mergeObject(NormServiceProps, props, extend);
        const trans = flow([config.transResponse, entity.result.setup]);

        entity.config.bind("controller", controller);
        entity.config.bind("signal", controller.signal);
        entity.toStart();

        return tofetch(unref(entity.config.source))
            .then((response) => {
                return trans(response);
            })
            .catch((error) => {
                return error;
            })
            .finally(() => {
                entity.toEnd();
            });
    }
    function sendAll(group, settled) {
        const groupServer = transArray(group, [group]);
        return transBoolean(settled, true)
            ? Promise.allSettled(groupServer.map((entity) => send(entity)))
            : Promise.all(groupServer.map((entity) => send(entity)));
    }
    function abort(entity) {
        if (isMock()) return;

        const controller = entity.config.take("controller");

        controller && controller.abort();
    }
    function abortAll(group) {
        transArray(group, [group]).forEach((entity) => abort(entity));
    }
    function define(props, defineResult) {
        const server = ResponseEntity(props, defineResult);
        return {
            server,
            clean: server.clean,
            abort: () => abort(server),
            obtain: (extend) => {
                // abort(server);
                return send(server, extend);
            }
        }
    }

    return {
        send,
        sendAll,
        abort,
        abortAll,
        define
    }
}

export default defineService;

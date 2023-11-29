/*
 * @FilePath: \Furnace\src\internal\service\entity\Response.js
 * @Author: maggot-code
 * @Date: 2022-12-04 00:48:41
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-12-07 18:16:00
 * @Description: 
 */
import { ConfigEntity } from "~/service/entity/Config";
import { NormResult } from "~/service/shread/constant";
import { useShallowObject } from "@/hooks/ref/useShallowObject";
import { useBooleanState } from "@/hooks/ref/useRefState";
// import { useProgress } from "@/hooks/useProgress";

// const progress = useProgress();

export function ResponseEntity(props, defineResult) {
    const config = ConfigEntity(props);
    const result = useShallowObject(NormResult);
    const startup = useBooleanState(false);
    const pend = useBooleanState(false);
    const finish = useBooleanState(true);

    const started = computed(() => unref(startup.state));
    const loading = computed(() => unref(pend.state));
    const finished = computed(() => unref(finish.state));

    function toRecord() {
        if (unref(started)) return;

        startup.toEnable();
    }
    function toStart() {
        pend.toEnable();
        finish.toDisable();
    }
    function toEnd() {
        toRecord();
        pend.toDisable();
        finish.toEnable();
    }
    function clean() {
        config.clear();
        result.clear();
        startup.toDisable();
        pend.toDisable();
        finish.toEnable();
    }

    return {
        started,
        pend,
        finish,
        config,
        result,
        loading,
        finished,
        toStart,
        toEnd,
        clean
    }
}

export default ResponseEntity;

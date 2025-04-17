import { MessageProps } from "@/store/agentStore";
import { randomColorHex } from "@/utils/common";
import { EE, genrateEventName } from "@/utils/events";
import { ComponentType, FC, FunctionComponent, memo, ReactNode, useEffect, useState } from "react"

export interface BaseMessageComponentProps {
    /** Message data */
    item: MessageProps & {
        event?: string
    };
}


type processType = () => ReactNode


export const ProcessFlow: FC<BaseMessageComponentProps> = ({ item }) => {
    const [processes, setProcesses] = useState<processType[]>([]);

    useEffect(() => {
        // Handler for tool events
        const handler = (data: { process: processType }) => {
            console.log(data)
            setProcesses(prev => {
                return prev.concat([data.process])
            })
        };
        const event = genrateEventName(item)
        console.log('event', event)
        // Subscribe to tool events
        EE.on(event, handler);

        // Cleanup subscription on unmount
        return () => {
            EE.off(event, handler);
        };
    }, [item.id]);
    return <div className="w-full max-w-[500px] max-h-36 break-words bg-white px-2 py-1 rounded-xl text-sm overflow-y-auto">
        {
            processes.map((Processes, index) => {
                return <Processes key={index} />
            })
        }
    </div>
}

const withProcessFlow = <P extends object & { item: MessageProps }>(BaseComponent: ComponentType<P>) => {
    return (props: P) => {

        return (
            <>
                <BaseComponent {...props} />
                <ProcessFlow item={props.item} />

            </>
        )
    }
}

export default withProcessFlow


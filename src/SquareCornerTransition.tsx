import React from 'react'
import {useStyle} from './hooks'
import withContainer from './withContainer'

interface SCTProps {
    w : number, 
    h : number, 
    onClick : Function, 
    scale : number
}

const SquareCornerTransition : React.FC<SCTProps> = (props : SCTProps) => {
    const {parentStyle, blockStyle, squareStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <div style = {parentStyle()}>
            <div style = {blockStyle()} onClick = {() => props.onClick()}></div>
            {[0, 1, 2, 3].map(i => (<div key = {`square_${i}`}style = {squareStyle(i)}/>))}
        </div>
    )
}

export default withContainer(SquareCornerTransition)
import {useState, useEffect, CSSProperties} from 'react'

const scGap : number = 0.02 
const delay : number = 20 

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    })
    return {
        w, 
        h
    }
}

export const useStyle = (w : number, h : number, scale : number) => {
    const position = 'absolute'
    const x = w / 2
    const y = h / 2
    const size = Math.min(w, h) / 10
    const background = 'indigo'
    const sf : number = Math.sin(scale * Math.PI)
    return {
        parentStyle() : CSSProperties {
            const left = `${w / 2}px`
            const top = `${h / 2}px`
            return {
                position, 
                left, 
                top
            }
        },
        blockStyle() : CSSProperties {
            const left = `${-size / 2}px`
            const top = `${-size / 2}px`
            const width = `${size}px`
            const height = `${size}px`
            const zIndex = 5
            return {
                position,
                left, 
                top, 
                width, 
                height, 
                background,
                zIndex 
            }
        },

        squareStyle(i : number) : CSSProperties {
            const ix : number = i % 2 
            const iy : number = Math.floor(i / 2)
            const left : string = `${-size / 2 - size * 0.5 * sf * (1 - 2 * ix)}px`
            const top : string = `${-size / 2 - size * 0.5 * sf * (1 - 2 * iy)}px`
            const width : string = `${size}px`
            const height : string = `${size}px`
            const opacity = 0.4 
            return {
                left, 
                top, 
                width,
                height,
                position, 
                background,
                opacity
            }
        }
    }
}
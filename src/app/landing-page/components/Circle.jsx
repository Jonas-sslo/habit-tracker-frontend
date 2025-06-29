export default function Circle({ top, left, bottom, right, opacity, color, className }) {
    const style = {
        top: top ? `${top}px` : undefined,
        left: left ? `${left}px` : undefined,
        bottom: bottom ? `${bottom}px` : undefined,
        right: right ? `${right}px` : undefined,
    };

    return (
        <div
            style={style}
            className={`hidden md:block absolute w-16 h-16 md:w-20 md:h-20 rounded-full z-0 ${className}`}
        >
            <div
                className="w-full h-full rounded-full"
                style={{
                    backgroundColor: color,
                    opacity: opacity,
                }}
            />
        </div>
    );
}

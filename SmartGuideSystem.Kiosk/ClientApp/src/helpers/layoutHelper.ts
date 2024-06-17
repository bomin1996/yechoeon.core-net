export function isHorizontalScreen() : boolean {
    return document.body.clientWidth > document.body.clientHeight;
}

export function isVerticalScreen() : boolean {
    return !isHorizontalScreen();
}

export function getScreenLayout() : "Horizontal" | "Vertical" {
    if (isHorizontalScreen()) {
        return "Horizontal"
    } else {
        return "Vertical"
    }
}
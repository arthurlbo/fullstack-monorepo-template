jest.mock("next/image", () => ({
    // biome-ignore lint/style/useNamingConvention: __esModule is a webpack/Jest module system convention
    __esModule: true,
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    default: (props: any) => (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <img alt={props.alt} src={props.src} onClick={props.onClick} className={props.className} />
    ),
}));

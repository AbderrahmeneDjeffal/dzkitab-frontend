export default function PublicLayout(props: LayoutProps<"/">) {
    return <body className="flex min-h-dvh">{props.children}</body>;
}

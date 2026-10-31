export default function ErrorContainer({ message }: { message: string }) {
    return (
        <div
            className={
                "flex-1 flex items-center justify-center bg-red-500/5 rounded-4xl"
            }
        >
            <span className={"text-red-500 text-lg font-medium"}>
                {message}
            </span>
        </div>
    );
}

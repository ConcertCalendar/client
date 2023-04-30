interface NotFound {
    childern ?: React.ReactNode;
}
const NotFound:React.FC<NotFound> = () => {
    return (
    <>
        페이지를 찾을 수 없습니다.
    </>
    )
}

export default NotFound;
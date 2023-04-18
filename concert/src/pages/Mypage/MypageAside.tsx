interface myPageAsideProps{
    children ?: React.ReactNode;
    className ?: string;

}

const MypageAside:React.FC<myPageAsideProps> = (props) => {
    const {children , className} = props;

    return (
        <aside className= {className}>
            {children}
        </aside>
    )
}

export default MypageAside;
interface MypageContentsProps{
    children ?: React.ReactNode;
    className ?: string;

}

const MypageContents:React.FC<MypageContentsProps> = (props) => {
    const {children , className} = props;

    return (
        <div className= {className}>
            {children}
        </div>
    )
}

export default MypageContents;
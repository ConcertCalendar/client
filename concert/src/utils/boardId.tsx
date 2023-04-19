export const changeBoardId = (boardId : number ) => {
    let boardName = "";
    switch (boardId) {
        case 1: 
            boardName = "자유 게시판"
            break;
        case 2:
            boardName = "공연 후기 게시판"
            break;
    }

    return boardName;
}
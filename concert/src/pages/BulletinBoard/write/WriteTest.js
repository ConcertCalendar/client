import {useEffect, useState , useRef} from 'react';
import styled from './WrtieTest.module.scss';
import SelectConcert from './SelectConcert';
import { axiosInstance } from 'utils/customAxios';
import { Editor } from '@tinymce/tinymce-react';

const WriteTest = (props) => {
    const [option , setOption ] = useState([]);
    const [title, setTitle] = useState('');
    const [content , setContent] = useState('');
    

    const extract = (data) => { //  공연 정보중 필요한 정보만 갖고 오기 위함
        const extractData = data.map((item)=> {
            const obj = { key : item.conNo , value : item.conTitle}
            return obj
        })
        return extractData;
    }

    const handleonClick = (event) => {
        event.preventDefault();
        console.log(content ,title)
        axiosInstance.post('/posts' , { 
            'boardId' : '1',
            'postTitle' : title,
            'postContent' : content
        }).then((res)=> console.log(res))
        .catch((err) => console.log(err))
    }

    const imageUpload = async(blob) => {
        const formData = new FormData();
        formData.append('file', blob, blob.name);
        axiosInstance.post('posts/1/uploadFile', formData , { headers : {
            'Content-Type':  'multipart/form-data' }
        }).then((res)=> {
            console.log(res);
           // setImageUri(res.data.data);
        }).catch((err)=> {
            console.log(err)
        })
    }

    const changeTitleHandler = (e) => {
        setTitle(e.target.value);

    }

    useEffect(()=> {
        axiosInstance.get('/calendar/event') //공연 정보를 드랍다운으로 갖고 오기 위해 정보를 갖고 오는 코드
        .then((res)=> {
            const data = extract(res.data.data)
            setOption(data);
        })
        .catch((err)=> {
            console.log(err);
        });
    }, [])


    return (
        <div className={styled.writeContainer}>
            <form>
            <button className={styled.writeButton} onClick={handleonClick} type = 'submit'> 작성 </button>
            <input  id = 'title' placeholder='제목을 입력하세요.' className= {styled.title} value = {title} onChange={changeTitleHandler}/>
            <SelectConcert option = {option}/>
            <Editor
            onInit={(evt, editor) => {
                setContent(editor.getContent({format: 'text'}));
            }}
            apiKey={process.env.REACT_APP_TINYMCE}
            initialValue="" //place holder
            onEditorChange={(newValue, editor) => {
                setContent(editor.getContent({format: 'text' }))
            }}
            init = {{
                height : 500,   
                statusbar : false,
                language : 'ko_KR',
                forced_root_block:false,
                image_title : true,
                forced_br_newlines: true,
                force_p_newlines: false,  
                menubar : false,
                file_picker_types : 'image media',
                block_unsupported_drop: false,
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount pagebreak ',
                toolbar_mode : 'sliding',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | align lineheight |  numlist bullist indent outdent |link image media table  | forecolor backcolor pagebreak hr|removeformat' ,
                link_default_target: '_blank',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                file_picker_callback : (callback , value , meta) => {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');

                    input.addEventListener('change', (e) => {
                        if(meta.filetype == 'image'){
                            const file= e.target.files[0];
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.addEventListener('load', (e)=> {
                                const objcetURL = URL.createObjectURL(file);
                                callback(objcetURL , {title : file.name})
                            })
                        }
                    })
                    input.click();
                }
            }}
            />
            </form>
        </div>
    )
}

export default WriteTest;

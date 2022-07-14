import IconButton from '@mui/material/IconButton'
import CommentIcon from '@mui/icons-material/Comment'
import CommentsDisabledIcon from '@mui/icons-material/CommentsDisabled'
import './Buttons.css'


function ScreenShareButton({ isChatHidden, setIsChatHidden }) {
    const handleToggleChat = async () => {
        setIsChatHidden(!isChatHidden)
    }
    return (
        <IconButton onClick={handleToggleChat} style={{ color: isChatHidden ? 'red' : 'white' }}>
            {!isChatHidden ? <CommentIcon className='controlButton' /> : <CommentsDisabledIcon className='controlButton' />}
        </IconButton>
    )
}

export default ScreenShareButton
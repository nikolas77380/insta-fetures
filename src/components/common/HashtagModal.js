import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Chip from '@material-ui/core/Chip';
import {useDispatch, useSelector} from "react-redux";
import {getHashtags, clearHashtags} from "../../actions/post";

const HashtagModal = ({open, handleClose, chooseHashtag}) => {

    const dispatch = useDispatch();
    const hashtagsData = useSelector(state => state.post.hashtags);

    const [hashtag, setHashtag] = useState('');

    useEffect(() => {

    }, []);

    const handleChange = (event) => {
        const {value} = event.target;
        let searchValue = value.split('');
        if(searchValue[0] === '#') {
            searchValue.shift();
        }
        dispatch(getHashtags(searchValue.join('')));
        const selfHashtag = value.split('')[0] !== '#' ? '#'+value : value;
        setHashtag(selfHashtag);
    };

    const handleClickChip = (hashtag) => {
        chooseHashtag(hashtag);
        dispatch(clearHashtags());
        setHashtag('');
    };

    return (
        <div>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="search #"
                        type="text"
                        value={hashtag}
                        onChange={handleChange}
                        fullWidth
                    />
                    {hashtagsData.length !== 0  &&
                    <>
                        <Chip
                            key={hashtag}
                            label={hashtag}
                            onClick={() => handleClickChip(hashtag)}
                            variant="outlined"
                        />
                        {hashtagsData.map(item => (
                            <Chip
                                key={item.hashtag.id}
                                label={'#'+item.hashtag.name + `(${item.hashtag.search_result_subtitle})`}
                                onClick={() => handleClickChip('#'+item.hashtag.name)}
                                variant="outlined"
                            />
                        ))}
                    </>}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default HashtagModal;

import React, { useState, useEffect, useContext } from 'react';

/* API REQUEST */
import axios from 'axios';

/* Styling */
import { HomeContainer } from '../assets/styles/Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons'

/* Components */
import { AuthContext } from './Auth';
import { domain } from '../config/deploy';


const Home = () => {
    const [file, setFile] = useState('');
    const [image, setImage] = useState('');
    const { currentUser } = useContext(AuthContext);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.post(`${domain}/login/${currentUser.email}`)
            .then((response) => {
                setImage(response.data.imageUrl.url);
            })
            .catch((error) => console.log(error));
    }, [message, image, currentUser.email]);

    const uploadPhoto = async (e) => {
        e.preventDefault();

        if (file !== '') {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post(`${domain}/upload/${currentUser.email}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                setImage(response.data.token.url);
                setMessage(response.data.message);
            } catch (error) {
                setMessage(error.response.data.message);
            }
        } else setMessage('Select a photo first.')
    };

    const handleSelectedPhoto = (e) => {
        setFile(e.target.files[0]);
        setMessage(`${e.target.files[0].name} selected.`);
    };

    return (
        <React.Fragment>
            <HomeContainer>
                <form>
                    {image !== '' ? <img src={image} alt="avatar" /> : null}
                    <label htmlFor="file">
                        Select photo <FontAwesomeIcon icon={faPen} />
                        <input
                            type="file"
                            id="file"
                            required
                            onChange={handleSelectedPhoto} />
                    </label>
                    <button onClick={uploadPhoto}>
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
                    {message !== '' ? <span>{message}</span> : <span> </span>}
                </form>
                <div>
                    <h1>Solved problems</h1>
                </div>
            </HomeContainer>
        </React.Fragment >
    );
};

export default Home;
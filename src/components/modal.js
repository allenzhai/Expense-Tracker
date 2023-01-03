import Modal from 'react-modal';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
    height: 50%;
    width: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
`

export default StyledModal;
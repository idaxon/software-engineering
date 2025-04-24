import { useHistory } from 'react-router-dom';

function StudentDashboard() {
    const history = useHistory();

    const handleSubmitClick = () => {
        history.push('/submit');
    };

    return (
        <div>
            <button onClick={handleSubmitClick}>Submit Work</button>
        </div>
    );
}

export default StudentDashboard; 
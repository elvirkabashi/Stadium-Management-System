import PropTypes from 'prop-types';

function LoadingSpinner({ color }) {
    return (
        <div className={`spinner-border ${color}`} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
}


LoadingSpinner.propTypes = {
    color: PropTypes.string
};

export default LoadingSpinner;

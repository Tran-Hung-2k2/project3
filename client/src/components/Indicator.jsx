function Indicator({ label, active, subLabel, onClick, className, primaryColor }) {
    return (
        <div className="mx-3 indicator">
            <span
                className={`indicator-item badge badge-${primaryColor} ${
                    active
                        ? `badge-primary shadow-lg border border-${primaryColor} text-${primaryColor} ${className}`
                        : ''
                }`}
            >
                {subLabel}
            </span>
            <button
                onClick={onClick}
                className={`btn btn-outline btn-sm btn-${primaryColor} ${active ? `btn-active !text-white` : ''}`}
            >
                {label}
            </button>
        </div>
    );
}

export default Indicator;

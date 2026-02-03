const LoadingBounceDots = () => {
    return (
        <>
            <div className="flex items-center justify-center space-x-2 animate-bounce">
                <div className="w-8 h-8 bg-primary rounded-full"></div>
                <div className="w-8 h-8 bg-secondary rounded-full"></div>
                <div className="w-8 h-8 bg-tertiary rounded-full"></div>
            </div>
        </>
    );
};

export default LoadingBounceDots;

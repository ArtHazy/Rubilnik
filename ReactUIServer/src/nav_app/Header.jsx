
/**
 * @param {{className:string, children}} args 
 * @returns 
 */
export const Header = (args) => {
    return <div className='Header'>
        <div className='header-content-container'>
            {args.children}
        </div>
    </div>;
};

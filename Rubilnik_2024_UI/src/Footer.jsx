//import { views } from '../../components-main/app/App';
import { ViewLibrary } from './ViewLibrary';
import { ViewProfile } from './ViewProfile';
import { ViewJoin } from './ViewJoin';
import home_svg from './assets/home.svg'
import hub_svg from './assets/hub.svg'
import user_svg from './assets/user.svg'

/**
 * @param {{bottom:number|string, children}} args 
 * @returns 
 */
export const Footer = (args) => {
    return (
        <div className='Footer' style={{ bottom: args.bottom }}>
            {args.children}
        </div>
    );
};

/**
 * @param {{view_name:string, set_view}} args 
 * @returns 
 */
export const ViewNavigation = (args) => {
    return (
        <div className='buttons-container'>
            <button onClick={ ()=>{args.set_view(()=>()=>ViewLibrary({set_view: args.set_view}))} }>
                <img className='icon' src={home_svg} alt="home icon" />
            </button>
            <button onClick={ ()=>{args.set_view(()=>()=>ViewJoin())} }>
                <img className='icon' src={hub_svg} alt="hub icon" />
            </button>
            <button onClick={ ()=>{args.set_view(()=>()=>ViewProfile({}))} }>
                <img className='icon' src={user_svg} alt="user icon" />
            </button>
        </div>
    )
}



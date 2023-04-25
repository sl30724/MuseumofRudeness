import { useState } from 'react';
import { Slant as Hamburger } from 'hamburger-react';

// navigation bar component
export default function Nav() {
    const [navOpen, setNavOpen] = useState<boolean>(false);

    return (
        <>
            <div className='hambuger'>
                <Hamburger
                    label="Menu Toggle Button"
                    rounded size={32}
                    distance="md"
                    direction="left"
                    toggled={navOpen}
                    toggle={setNavOpen} />
            </div>
            <div className={`menuLayer-${navOpen ? "shown" : "hidden"}`}>
                <div className={`menuContent-${navOpen ? "shown" : "hidden"}`}>
                    <p>We invite you to join us on an interactive experience that examines your knowledge on different culture nuances when it comes to rude behaviors.</p>
                    <br></br>
                    <p>Don't worry. We won't judge you too hard.</p>
                    <br></br>
                    <h4>View Exhibits</h4>
                    <ul>
                        <li><a href="#exhibit1" id="TissuePaper"><h5>Sniff or Blow</h5></a></li>
                        <li><a href="#exhibit2" id="Hand"><h5>Ten Little Fingers</h5></a></li>
                    </ul>
                </div>
            </div>
        </>
    );
}
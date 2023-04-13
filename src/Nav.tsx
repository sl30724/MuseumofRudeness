import { useState } from 'react';
import { Slant as Hamburger } from 'hamburger-react';

// navigation bar component
export default function Nav() {
    const [navOpen, setNavOpen] = useState<boolean>(false);

    return (
        <>
            <nav role='Navigation bar' aria-label='Navigation bar'>
                <div className='hambuger'>
                    <Hamburger
                        label="Open Menu"
                        rounded size={32}
                        distance="md"
                        direction="left"
                        toggled={navOpen}
                        toggle={setNavOpen} />
                </div>
            </nav>
            <div className={`menuLayer-${navOpen ? "shown" : "hidden"}`}>
                <p>We invite you to join us on an interactive experience that examines your knowledge on different culture nuances when it comes to rude behaviors.</p>
                <p>Don't worry. We won't judge you too hard.</p>
                <h2>View Exhibits</h2>
                <ul>
                    <li><a href="#exhibit1" id="TissuePaper">Sniff or Blow</a></li>
                    <li><a href="#exhibit2" id="Hand">Ten Little Fingers</a></li>
                </ul>
            </div>
        </>
    );
}
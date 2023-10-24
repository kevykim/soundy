// import AudioPlayer from 'react-h5-audio-player'
// import 'react-h5-audio-player/lib/styles.css';




function Footer () {

    return (
        <div>
            <div >
                <audio 
                        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
                        controls
                        className='w-full bg-audioplayer'
                        >
                          </audio>
            </div>
        <footer className="flex flex-row justify-between p-2 border border-t-slate-300 text-sm text-slate-600">
            <div className="pl-2">
                &copy; 2023 Soundy, Inc. &nbsp;·&nbsp;SoundCloud Clone
            </div>
            <div className="pr-2">
            <a
                  className="hover:text-green-700 hover:underline"
                  href="https://github.com/kevykim"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </a>
                &nbsp;·&nbsp;
                <a
                  className="hover:text-green-700 hover:underline"
                  href="https://linkedin.com/in/kevin-kim-a88429150"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                &nbsp;·&nbsp;
                <a
                  className="hover:text-green-700 hover:underline"
                  href="mailto:kebonkim@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Email
                </a>
            </div>
        </footer>
        </div>
    )
}




export default Footer;
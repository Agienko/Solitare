import {clickSound} from "../sounds/sounds.js";

const popap = document.createElement('div')
popap.className = 'poapWrapper'
popap.dataset.close = true
popap.innerHTML = `
  <div class="popapWindow" data-close="true">
     <header>
         <div class="headerName" >Rools</div>
         <span class="headerClose" data-close="true">x</span>
     </header>
    <main>
        <h2> SOLITAIRE </h2>
        <p> Move all cards to foundations</p>
        <h3> GROUNDS <span>(top row)</span></h3>
        <ul>
         <li>Collect sequences of the same suit in ascending order</li>
        </ul>
        <h3> PLAYING FIELD</h3>
        <ul>
            <li> Collect sequences in descending order by alternating colors</li>
            <li> Correct sequences can be moved in whole or in parts</li>
        </ul>
        <h3> DECK</h3>
        <ul>
            <li>Unlimited retakes</li>
        </ul>
        <h3> DEMO</h3>
         <ul>
            <li>After deal, write in console: "demo(true)", to run demo of win animation</li>
        </ul>
    </main>
    <footer>
        <a href="https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D1%81%D1%8B%D0%BD%D0%BA%D0%B0_(%D0%BF%D0%B0%D1%81%D1%8C%D1%8F%D0%BD%D1%81)" target="_blank">Wiki</a>
    </footer>        
    <button class="closeBtn" data-close="true">close</button>   
  </div>
`
gsap.to(popap, { scale: 0, y: -400, duration: 0, opacity:0, ease: 'Power3.easeIn'})

document.body.appendChild(popap)

document.addEventListener('pointerdown', closePopap)

function closePopap(e){
    if(e.target.dataset.close){
        clickSound.play()
        gsap.to(popap, { scale: 0, y: -400, duration: .2, opacity:0, ease: 'Power3.easeIn'})
    }
}

export function openPopap() {
    gsap.to(popap, { scale: 1, y: 0, duration: .2, opacity:1, ease: 'Power4.easeOut'})
}

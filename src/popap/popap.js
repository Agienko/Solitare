import {clickSound} from "../sounds/sounds.js";

const popap = document.createElement('div')
popap.className = 'poapWrapper'
popap.dataset.close = true
popap.innerHTML = `
  <div class="popapWindow" data-close="true">
     <header>
         <div class="headerName" >Правила</div>
         <span class="headerClose" data-close="true">x</span>
     </header>
    <main>
        <h2> ПАСЬЯНС КОСЫНКА </h2>
        <p> Переместите все карты на основания</p>
        <h3> ОСНОВАНИЯ <span>(верхний ряд)</span></h3>
        <ul>
         <li>Собирайте последовательности одной масти по возрастанию</li>
        </ul>
        <h3> ИГРОВОЕ ПОЛЕ</h3>
        <ul>
            <li> Собирайте последовательности по убыванию чередуя цвет</li>
            <li> Правильные последовательности можно перемещать полностью или частями</li>
        </ul>
        <h3> КОЛОДА</h3>
        <ul>
            <li>Неограниченные пересдачи</li>
        </ul>
    </main>
    <footer>
        <a href="https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D1%81%D1%8B%D0%BD%D0%BA%D0%B0_(%D0%BF%D0%B0%D1%81%D1%8C%D1%8F%D0%BD%D1%81)" target="_blank">Wiki</a>
    </footer>           
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
    clickSound.play()
    gsap.to(popap, { scale: 1, y: 0, duration: .2, opacity:1, ease: 'Power4.easeOut'})
}

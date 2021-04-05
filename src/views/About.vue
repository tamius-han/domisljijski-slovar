<template>
  <div class="root flex flex-column">
    <div class="page flex-grow flex-noshrink">
      <div class="content content-shifted h100">
        <div class="flex flex-column h100">
          <div class="flex-nogrow flex-noshrink">
            <div class="text-box">
              <div class="background"></div>
              <div class="content">
                <h1>
                  Kdo in kaj
                </h1>
                <p>
                  V zadnjem času je priljubljenost domišljijskih del rahlo narasla, na račun iz Anglije ter (predvsem) Amerike uvoženih knjig, filmov in iger. Skupaj z njim je prišla ena celgafuka [TODO: povezava na 'alot']
                  besed, za katere nekega požegnanega prevoda pač ni. To je rahlo škoda, ker je slovenščina v bistvu kar lep jezik, ki ga pri igranju temnic in zmajev ne gre kaliti z grdimi, iz angleščine sposojenimi besedami.
                  Tako smo se odločili, da gremo v prostem času "tako za foro" prevajati stvari v slovenščino.
                </p>
                <p>
                  Ta stran ni kaj preveč uradna stvar, temveč je bolj 'konjiček' — bolj ali manj 'dva modela v garaži' brez kakšne formalne izobrazbe v jezikoslovju in brez kakšne posebne avtoritete na tem področju. Tako ta
                  stran mogoče ni ravno najboljši vir za poklicne prevajalce (čeprav se ne bomo prav nič pritoževali, če se kakšne stvari iz tega slovarčka znajdejo v divjini), ampak za petkovo igro temnic in zmajev bo pač
                  verjetno zadosti.   
                </p>
                <p>&nbsp;</p>
                <p>
                  <b>Dodatne povezave:</b>
                </p>
                <p>
                  <ul>
                    <li>
                      Igralski priročnik za Temnice in Zmaje (5e), v slovenščini. (Alan dodaj link ko bo pdf, razen če je read-only link na gdrive ok)
                    </li>
                    <li>
                      <a href="http://xn--temnie-m2a58d.tamius.net">Temnišče</a>: slovenski D&D wiki.
                    </li>
                  </ul>
                </p>
                <p>
                  &nbsp;
                </p>
                <p>
                  &nbsp;
                </p>
                <p>
                  <b>Kdo je kriv za to</b>
                </p>
                <div class="person-box-container">
                  <div class="person-box">
                    <div class="name">Tamius Han</div>
                    <div class="description">Po poklicu programer, v prostem času kdaj tudi kaj piše ali riše.</div>
                    <div class="links">
                      <ul>
                        <li><a href="https://tamius.net">spletna stran</a></li>
                        <li>Kontakt: <a href="mailto:tamius.han+ds@gmail.com">tamius.han+ds@gmail.com</a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="person-box">
                    <div class="name">[lusk]</div>
                    <div class="description">[description]</div>
                    <div class="links">
                      <ul>
                        <li>[insert links]</li>
                        <li>[insert links]</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page page-center flex-nogrow">
      <div class="content">
        <small>
          <p>
            Cehovske vojne 2 (Guild Wars 2), tko ob potki. Durmand Priory, včasih je bila to komadno velka knjižnica, ampak zdej ni več :(. Ft. noVideo freestyle stvar. Tehnično gledano je slika narejena iz treh ločenih zaslonskih slik, ker "»‚›„tilt shift“‹ʼ«" filter dovoli, da gre nezabrisan del samo čez sredino.
            Jaz sem hotel ostrino na tablicah, ne 20% desno od tablic. noVideo, prosim popravi.
          </p>
        </small>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.root {
  height: 100%;
  width: 100%;
  background-image: url('/img/backgrounds/about-background.webp');
  z-index: 0;
  background-position: center bottom;
  background-size: cover;
  background-attachment: fixed;

  position: relative;
}
p, ul, li {
  color: #eee;
}
b {
  color: #fff;
}

.content-shifted {
  margin-left: 50%;
}

.page {
  text-align: left;
}
.page-center {
   text-align: center;
}

h1 {
  margin-top: 1rem;
  color: #ffbc8f;
}

a, a:visited {
  color: #f0965b;
}
a:hover {
  color: #ffbc8f;
}

.text-box {
  position: fixed;
  z-index: 2;
  // border: 1px double #fa6;
  overflow: hidden !important;

  margin-top: 10rem;

  .background{
    position: absolute;
    top: 0px;
    left: 0px;

    z-index: 1;

    width:100%;
    height:100%;

    background-image: url('/img/backgrounds/about-background.webp');
    background-position: center bottom;
    background-size: cover;
    background-attachment: fixed;

    filter: blur(12px) brightness(69%) sepia(0.2) saturate(100%);
  }

  .content {
    padding: 2em;
    position: relative;
    z-index: 4;
  }
}

.person-box-container {
  display: flex;
  flex-wrap: wrap;

  .person-box {
    flex-basis: 50;
    min-width: 24rem;

    margin: 0 1rem;

    color: #eee;

    .name {
      color: #f0965b;
      font-family: 'Vollkorn SC';
      font-size: 1.337rem;
    }
  }
}

</style>
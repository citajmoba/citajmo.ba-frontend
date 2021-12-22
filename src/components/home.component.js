import React, { Component } from "react";
import AccessService from "../services/access.service";
import pic1 from "../img/seven-shooter-hPKTYwJ4FUo-unsplash.jpg";
import pic2 from "../img/florian-schmetz-lbVKwIAZ6EY-unsplash.jpg";
import pic3 from "../img/laura-kapfer-hmCMUZKLxa4-unsplash.jpg";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    AccessService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container-homepage">
        {/*<header className="jumbotron">
          <h3>{this.state.content}</h3>*/}
          <div className="body-homepage">
            <main>
                <div className="banner-homepage">
                    <h1>ČITAJMO.BA</h1>
                </div>
                <div className='mission-homepage'>
                    <h2>Naša misija je da promovišemo čitanje kao put ka poboljšanju obrazovanja, 
                    svijesti i općeg dobrostanja u društvu.</h2>
                </div>
                <div className='activities-homepage'>
                    <div className='item-homepage'>
                        <img src={pic1} alt=""/>
                        <h2>Čitanje</h2>
                        <h3>Osvoji poene čitanjem. Zamijeni poene za ono što voliš.</h3>
                    </div>
                    <div className='item-homepage'>
                        <img src={pic2} alt=""/>
                        <h2>Takmičenje</h2>
                        <h3>Odmjeri se sa svojim vršnjacima u čitanju. Budi čitalac na duge staze.</h3>
                    </div>
                    <div className='item-homepage'>
                        <img src={pic3} alt=""/>
                        <h2>Doprinos</h2>
                        <h3>Pomozi drugima i budi im inspiracija da više čitaju.</h3>
                    </div>
                </div>
                <div className='testimonials-homepage'>
                    <h1>"Nisam znao da mogu steći društvo kroz čitanje."</h1>
                    <h1>"Uživam da čitam i pokušavam da pogodim pitanja koja će doći na kvizu."</h1>
                </div>
            </main>
        </div>
        <footer className="footer-homepage">
            Čitajmo.ba je neprofitna organizacija za promociju obrazovanja i kulture. Kontakt: citajmo.ba@gmail.com. Adresa; Vojničko polje bb
        </footer>

        {/*</header>*/}
      </div>
    );
  }
}
import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "../../../components/Sidebar/SiderbarAdm/SidebarAdmServicos";


export default function RedesVirtuais() {
    const [listaRedes, setListaRedes] = useState([]);
    const [dataCadastro, setDataCadastro] = useState("");

    function buscarRedes() {
        axios('https://back-door.azurewebsites.net/api/redevirtuals', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaRedes(resposta.data)
                };
            })
            .catch(erro => console.log(erro));
    };
    useEffect(buscarRedes, []);

    return (
        <div>
            <Sidebar />
            <div className="conteudo">
                <div className="container-conteudo-users">
                    <div className="container-titulo">
                        <h1>Redes Virtuais</h1>
                    </div>
                    <div className="container-input">
                        <input type="text" placeholder="Buscar" />
                    </div>
                    <div className="listagem">
                        {
                            listaRedes.map((rede) => (
                                <div key={rede.IdRedeVirtual} className="retangulo-usuario">
                                    <a href={"dadosredevirtualadm/"+rede.idRedeVirtual}>
                                    <h1>{rede.nomeRedeVirtual}</h1>
                                    <h2>Data de Cadastro:</h2>
                                    <p>{Intl.DateTimeFormat({
                                        year: "numeric", month: "numeric", day: "numeric"
                                    }).format(new Date(rede.dataCadastro))}</p>
                                    </a>
                                </div>
                            )
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

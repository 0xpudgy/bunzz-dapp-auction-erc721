import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useEffect, useState } from "react";

const Header = () => {
    const location = useLocation();

    const injectedConnector = new InjectedConnector({ supportedChainIds: [11155111], });
    const { chainId, account, activate, active, library } = useWeb3React();
    const [balance, setBalance] = useState("");

    const handleWallet = () => {
        if (!account) {
            activate(injectedConnector);
        }
    }
    useEffect(() => {
        library?.getBalance(account).then((result) => {
            setBalance(result / 1e18)
        })
    },);

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Auction ERC721</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto gap-3">
                        <Nav.Item>
                            <Link to="/" className={location.pathname === "/" ? `nav-link active` : 'nav-link'}></Link>
                        </Nav.Item>

                    </Nav>
                    <Nav>
                        <Button variant="outline-light" onClick={handleWallet}>
                            {account ? account.replace(/(.{4}).*(.{4})/, "$1...$2") : 'Connect Wallet'}
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;
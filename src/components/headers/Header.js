import {Link} from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import uiStore from '../../store/UIStore';

const Header = () =>
    <Nav
        variant='pills'
        activeKey={uiStore.currentPage}
        onSelect={eventKey => uiStore.setPage(eventKey)}>

        <Nav.Item>
            <Nav.Link
                as={Link}
                eventKey='/'
                to='/'>
                <h5 class="text-light"> Home</h5>
            </Nav.Link>
        </Nav.Item>
        <Nav.Item>
            <Nav.Link
                as={Link}
                eventKey='/sessions'
                to='/sessions'>
                <h5 class="text-light"> Sessions</h5>
            </Nav.Link>
        </Nav.Item>

        <Nav.Item>
            <Nav.Link
                as={Link}
                eventKey='/machines'
                to='/machines'>
                <h5 class="text-light"> Machines</h5>
            </Nav.Link>
        </Nav.Item>

        <Nav.Item>
            <Nav.Link
                as={Link}
                eventKey='/users'
                to='/users'>
                <h5 class="text-light"> Users</h5>
            </Nav.Link>
        </Nav.Item>

        <Nav.Item>
            <Nav.Link
                as={Link}
                eventKey='/media'
                to='/media'>
               <h5 class="text-light"> Media</h5>
            </Nav.Link>
        </Nav.Item>
        
    </Nav>

export default Header;
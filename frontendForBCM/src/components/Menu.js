import Dropdown from 'react-bootstrap/Dropdown'
import SplitButton from 'react-bootstrap/SplitButton';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../App.css';
export default function Menu() {
    return (
        <>

            <div className='box'>
                <div>
                    <SplitButton style={{marginBottom: '3px'}} key='bill' href='/bills' id='dropdown-button-drop-end' drop='end' variant="secondary" title='Bill'>
                        <Dropdown.Item eventKey="1" href='/bills/newBill'>New Bill</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="2" href='/bills/'>Bill Details</Dropdown.Item>
                    </SplitButton>
                </div>
                <div>
                    <SplitButton key='customer' style={{marginBottom: '3px'}} href='/' id='dropdown-button-drop-end' drop='end' variant="secondary" title='Customers'>
                        <Dropdown.Item eventKey="1" href='/customers/newCustomer' >New Customer</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="2" href='/' >Customer Details</Dropdown.Item>
                    </SplitButton>
                </div>
                <div>
                    <DropdownButton key='analytics' id='dropdown-button-drop-end' drop='end' variant="secondary" title='Analytics'>
                        <Dropdown.Item eventKey="1" href='/monthlySell' >Monthly Sell</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="2" href='/productsSell' >Products Sell</Dropdown.Item>
                    </DropdownButton>
                </div>

            </div>


        </>
    )
}

import { Card, Button } from 'react-bootstrap';


export default function Auth() {
    return (
        <>
        <div style={{ height: '89vh', display: 'flex',alignItems: 'center' ,justifyContent : 'center'}}>

            <Card className = 'shadow-lg p-3 mb-5 rounded' style={{backgroundColor: '#F0F0F0' }}>

                
                    <Card.Body style={{textAlign: 'center'}}>
                        <Card.Title>Welcome!</Card.Title>
                        <Card.Text>
                            Please log in to continue OR register if you are new here...
                        </Card.Text>


                        <Button style={{ marginRight: '3%',borderRadius: '12px' }} variant="secondary" href="/login">Log In</Button>
                        <Button style={{ borderRadius: '12px' }} variant="secondary" href="/reg">Register</Button>

                    </Card.Body>
                
     
            </Card>
        </div>

        </>
    )
}

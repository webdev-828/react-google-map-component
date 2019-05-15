import React, { Component } from 'react';
import { Tick } from '../../../assets/images/svgIcons'
import style from './addPage.module.scss';
import {
  Button, Input,Card,Modal,Row, Col
} from 'antd';

class AddPage extends Component {
  state = {
    loading: false,
    visible: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }
  render() {
    const { visible,} = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Add Page
        </Button>
        <Modal
          visible={visible}
          title=""
          onCancel={this.handleCancel}
          width="500px"
          footer={
            <div className={ style.footer }>
            <Button className={ style.button} type="primary">Create</Button>
            <Button>Set as homepage</Button>
            </div>
          }
        >
         <h3 className={ style.title }> Add Page</h3>
        <Card className={ style.box }>
        <h6>Details</h6>
        <label className={ style.text }>TITLE<span className={ style.red }>*</span></label>
        <Input placeholder={this.props.title}/>
        <label className={ style.text }>SLUG-</label>
        <Tick styling={style.tick}/>
        <Row>
          <Col span={16}>
            <Input placeholder={this.props.slug} disabled/>
          </Col>
          <Col span={5}>
            <Input placeholder={this.props.title} />
          </Col>
          </Row>
        
        </Card>

        <Card className={ style.box }>
        <h6>API Matters</h6> 
        <label className={ style.text }>API</label> 
        <label className={ style.redtext }>REGENERATE</label>
        <Input placeholder={this.props.API} />
        <br />
        <br />
        <Button>View API</Button>
        </Card>
        </Modal>
      </div>  
    );
  }
}


export default AddPage;





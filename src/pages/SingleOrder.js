import { Button, Card, Col, Divider, Form,  Mentions, message, Popconfirm, Popover, Radio, Row,  Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import backend_url from "../helpers/api";
import { config } from "../utils/apis";

const columns = [
  {
    title: "Անվանում",
    dataIndex: "productName",
    key: "productName",
    width: "10%",
  },
  {
    title: "Կոդ",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "քանակ",
    key: "quantity",
    dataIndex: "quantity",
  },
  {
    title: "Արժեք",
    key: "productPrice",
    dataIndex: "productPrice",
  },
];

export const SingleOrder = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState(null);
  const [time,setTime] = useState(null);
  const [status, setStatus] = useState(null)
  const [products, setProducts] = useState(null)
  const [address, setAddress] = useState(null)
    const router = useLocation();

    useEffect(() => {
      let id = router.pathname.split('/')[3];
      const token  = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios.get(`${backend_url}orders/${id}`, config).then((res) => {
        let dateByTime = res.data.createdAt.split('T');
        let indexOf = dateByTime[1].lastIndexOf(":");
        dateByTime[1] = dateByTime[1].substring(0, indexOf)
        setTime(dateByTime);
        const obj = {};
        for (let key in res.data.address) {
          if (res.data.address[key]) {
            obj[key] = res.data.address[key];
          }
        }
        let arrProd = [];
        res.data.products.map(function(el, ind) {
          return arrProd.push({...el, key: ind, ...el.product})
        })
        setStatus(res.data.status)
        setProducts(arrProd)
        setAddress(obj)
        setData(res.data)
       
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const editStatus = (e) => {
      const body = {
        orderStatus: e.target.value
      }
      axios.put(`${backend_url}orders/update-order-status/${data.id}`, body, config).then((res) => {
        setStatus(e.target.value)
      })
    }

    const content = (
      <>
      <Radio.Group defaultValue={data && (data.status || "IN_PROGRESS")} buttonStyle="solid" onChange={editStatus}>
        <Radio.Button  value="COMPLETED">COMPLETED</Radio.Button>
        <Radio.Button value="IN_PROGRESS">IN_PROGRESS</Radio.Button>
        <Radio.Button value="CANCELED">CANCELED</Radio.Button>
        <Radio.Button value="REFUNDED">REFUNDED</Radio.Button>
      </Radio.Group>
      </>
    )

    const refundHandler = () => {
      axios.post(`${backend_url}payment/${data.paymentId}/refund`, {}, config).then((res) => {
        setStatus("REFUNDED");
          messageApi.open({
            type: 'success',
            content: 'Successfully Refunded',
          });
      }).catch((err) =>{
        messageApi.open({
          type: 'error',
          content: 'something went wrong',
        });
      })
    }

    return (
        <>
          {data ? 
          <div className="tabled">
            {contextHolder}
            <Row gutter={[24, 0]}>
              <Col xs="24" xl={24}>
                <Card
                  bordered={false}
                  className="criclebox tablespace mb-24"
                  title="Պատվեր"
                >
                  <div className="table-responsive">
                    <>
                      <Divider />
    
                      <Form
                        labelCol={{
                          span: 4,
                        }}
                        wrapperCol={{
                          span: 14,
                        }}
                        layout="horizontal"
                      >
                        <Form.Item label="կոդ">
                          <Mentions
                            placeholder={data.id}
                            readOnly
                          />
                        </Form.Item>
                        
    
                        <Form.Item label="գնված է">
                          <Mentions
                            placeholder={time[0] + "  " + time[1]}
                            readOnly
                          />
                        </Form.Item>
    
                        <Form.Item label="ընդհանուր">
                          <Mentions
                            placeholder={data.summary}
                            readOnly
                          />
                        </Form.Item>
                        <Form.Item label="գնման մեթոդ">
                          <Mentions
                            placeholder={data.paymentMethod === "FOR_PAYPAL" ? "անկանխիկ" : "կանխիկ"}
                            readOnly 
                          />
                          {
                            data.paymentMethod === "FOR_PAYPAL" &&
                            (status === "COMPLETED" ?
                            <Popconfirm placement="bottom" title="Գումարի վերադարձ paypal-ով" onConfirm={refundHandler} trigger="click">
                              <Button>Վերադարձ</Button>
                            </Popconfirm> :
                            status === "REFUNDED" &&
                            <Button disabled={true}>Վերադարձված է</Button>)
                          }
                        </Form.Item>
                        <Form.Item label="ստացող">
                          <Mentions
                            placeholder={data.receiverFullName}
                            readOnly
                          />
                        </Form.Item>
    
                        <Form.Item label="գնորդ">
                          <Mentions
                            placeholder={data.user.email}
                            readOnly
                          />
                        </Form.Item>
    
                        <Form.Item label="ստատուս">
                          <Mentions
                              placeholder={status}
                              readOnly
                          />
                          <Popover placement="bottom" content={content} trigger="click">
                            <Button disabled={status === "REFUNDED"}>Փոխել վիճակը</Button>
                          </Popover>
                        </Form.Item>
    
                        <Form.Item label="հասցե">
                          <Mentions
                            placeholder={address ? `${address.city + " " + address.address + " " + (address.entrance || "") + " " + (address.floor || "") + " " + (address.apartment || "")}` : ""}
                            readOnly
                          />
                        </Form.Item>
                        <Form.Item label="լրացուցիչ ինֆորմացիա">
                          <Mentions
                            placeholder={data.extraInformation}
                            readOnly
                          />
                        </Form.Item>
                        <Form.Item label='Ապրանքներ'>
                          <Table
                            columns={columns}
                            dataSource={products}
                            pagination={false}
                            className="ant-border-space"
                          />
                        </Form.Item>
                        
                      </Form>
                    </>
                  </div>
                </Card>
              </Col>
            </Row>
          </div> : "No data yet"}
        </>
      );
}
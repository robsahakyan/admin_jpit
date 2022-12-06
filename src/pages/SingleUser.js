import { Button, Card, Col, Divider, Form, Mentions, Popconfirm, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import backend_url from "../helpers/api";
import { config } from "../utils/apis";


export const SingleUser = () => {
  const [data, setData] = useState(null);
  const router = useLocation();
  const text = "Համոզվա՞ծ եք դադարացնել օգտատիրոջ ծառայությունները"

    useEffect(() => {
      let id = router.pathname.split('/')[3];
      const token  = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios.get(`${backend_url}users/${id}`, config).then((res) => {
        setData(res.data)
       
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const confirm = (e) => {
      axios.put(`${backend_url}users/block/${data.id}`, {}, config).then((res) => {
        setData({...data, status: "BLOCKED"})
      })
    }


    return (
        <>
          {data ? 
          <div className="tabled">
            <Row gutter={[24, 0]}>
              <Col xs="24" xl={24}>
                <Card
                  bordered={false}
                  className="criclebox tablespace mb-24"
                  title="Օգտատեր"
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
                        <Form.Item label="անուն ազգանուն">
                          <Mentions
                            placeholder={data.fullName}
                            readOnly
                          />
                        </Form.Item>
                        
    
                        <Form.Item label="էլ․ հասցե">
                          <Mentions
                            placeholder={data.email}
                            readOnly
                          />
                        </Form.Item>
    
                        <Form.Item label="սեռ">
                          <Mentions
                            placeholder={data.gender}
                            readOnly
                          />
                        </Form.Item>
                        <Form.Item label="ծննդյան օր">
                          <Mentions
                            placeholder={data.birthday}
                            readOnly
                          />
                        </Form.Item>
                        <Form.Item label="հեռախոսահամար">
                          <Mentions
                            placeholder={data.phone}
                            readOnly
                          />
                        </Form.Item>
    
                        <Form.Item label="ստատուս">
                          <Mentions
                            placeholder={data.status}
                            readOnly
                          />
                          
                        </Form.Item>
                      
                      </Form>
                      
                    </>
                  </div>
                </Card>
                <Popconfirm placement="bottom"  title={text} disabled={data.status === "BLOCKED"} onConfirm={confirm} okText="Այո" cancelText="Ոչ" trigger="click">
                    <Button disabled={data.status === "BLOCKED"} style={{backgroundColor: "red", color: "white", }}>Կասեցնել ծառայությունները</Button>
                </Popconfirm>
              </Col>
            </Row>
          </div> : "No data yet"}
        </>
      );
}
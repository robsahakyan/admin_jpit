//import { ToTopOutlined } from "@ant-design/icons";
import { useState } from "react";
//import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Card,
  Select,
  InputNumber,
  Divider,
  Upload,
} from "antd";
import axios from "axios";
import { useEffect } from "react";
import backend_url from "../helpers/api";
//const { RangePicker } = DatePicker;
const { TextArea } = Input;

//const { Title } = Typography;

function ProductsCreate() {
  //const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  //const [componentDisabled, setComponentDisabled] = useState(true);

  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    axios.get(`${backend_url}categories`).then((res) => {
      setCategories(res.data);
    });

    axios.get(`${backend_url}events`).then((res) => {
      setEvents(res.data);
    });

    axios.get(`${backend_url}targets`).then((res) => {
      setTargets(res.data);
    });
  }, []);

  // states fro cretae new product
  const [name, setName] = useState();
  const [nameRu, setNameRu] = useState();
  const [nameEN, setNameEn] = useState();
  const [code, setCode] = useState();
  const [description, setDescription] = useState();
  const [descriptionRu, setDescriptionRu] = useState();
  const [descriptionEn, setDescriptionEn] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [event, setEvent] = useState();
  const [target, setTarget] = useState();
  const [fromAge, setFromAge] = useState();
  const [toAge, setToAge] = useState();
  const [stock, setStock] = useState();
  const [files, setFiles] = useState([]);

  const cretaeProduct = async () => {
    const formData = new FormData();
    let data = {
      name,
      nameEN,
      nameRu,
      toAge,
      fromAge,
      stock,
      files,
      price,
      event,
      code,
      category,
      target,
      description,
      descriptionEn,
      descriptionRu
    }
    for (let key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }
    
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i].originFileObj);
    }
    axios
      .post(`${backend_url}products`, formData, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((el) => {
        alert("greate")
        window.history.back()
      })
      .catch((err) => {
        alert("something went wrong!");
      });
  };

  const onFormLayoutChange = ({ disabled }) => {
    //setComponentDisabled(disabled);
  };
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Ավելացնել ապրանք"
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
                    onValuesChange={onFormLayoutChange}
                  >
                    <Form.Item label="Անվանում">
                      <Input onChange={(el) => setName(el.target.value)} />
                    </Form.Item>

                    <Form.Item label="название">
                      <Input onChange={(el) => setNameRu(el.target.value)} />
                    </Form.Item>

                    <Form.Item label="title">
                      <Input onChange={(el) => setNameEn(el.target.value)} />
                    </Form.Item>
                    <Form.Item label="Կատեգորիա">
                      <Select mode="tags" onChange={(el) => setCategory(el)}>
                        {categories.map((item) => (
                          <Select.Option value={item?.name}>
                            {item?.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="իրադարձություն">
                      <Select  mode="tags" onChange={(el) => setEvent(el)}>
                        {events.map((item) => (
                          <Select.Option value={item?.name}>
                            {item?.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item label="թիրախ">
                      <Select mode="tags" onChange={(el) => setTarget(el)}>
                        {targets.map((item) => (
                          <Select.Option value={item?.name}>
                            {item?.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item label="կոդ">
                      <InputNumber onChange={(el) => setCode(el)} />
                    </Form.Item>

                    <Form.Item label="Սկսած Տարեկանից">
                      <InputNumber onChange={(el) => setFromAge(el)} />
                    </Form.Item>

                    <Form.Item label="Մինջև Տարեկան">
                      <InputNumber onChange={(el) => setToAge(el)} />
                    </Form.Item>

                    <Form.Item label="Քանակ(պաշար)">
                      <InputNumber onChange={(el) => setStock(el)} />
                    </Form.Item>

                    <Form.Item label="Գին">
                      <InputNumber onChange={(el) => setPrice(el)} />
                    </Form.Item>

                    <Form.Item label="Նկարագրություն">
                      <TextArea
                        rows={4}
                        onChange={(el) => setDescription(el.target.value)}
                      />
                    </Form.Item>
                    <Form.Item label="описание">
                      <TextArea
                        rows={4}
                        onChange={(el) => setDescriptionRu(el.target.value)}
                      />
                    </Form.Item>
                    <Form.Item label="description">
                      <TextArea
                        rows={4}
                        onChange={(el) => setDescriptionEn(el.target.value)}
                      />
                    </Form.Item>

                    <Form.Item label="Նկարներ" valuePropName="fileList">
                      <Upload
                        listType="picture-card"
                        maxCount={5}
                        multiple
                        onChange={(el) => {
                          setFiles(el.fileList);
                        }}
                      >
                        <div>
                          <PlusOutlined />
                          <div
                            style={{
                              marginTop: 8,
                            }}
                          >
                            Ավելացնել
                          </div>
                        </div>
                      </Upload>
                    </Form.Item>
                    <Form.Item label="">
                      <Button onClick={cretaeProduct}>Պահպանել</Button>
                    </Form.Item>
                  </Form>
                </>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ProductsCreate;

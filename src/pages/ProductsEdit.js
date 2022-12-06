/* eslint-disable react-hooks/exhaustive-deps */
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
import { useParams } from "react-router-dom";

import { useEffect } from "react";
import backend_url from "../helpers/api";
const { TextArea } = Input;

function ProductsEdit() {

  const [product, setProduct] = useState();
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [targets, setTargets] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`${backend_url}products/${id}`).then((res) => {
      setProduct(res.data);
    });

    axios.get(`${backend_url}categories`).then((res) => {
      setCategories(res.data);
    });

    axios.get(`${backend_url}events`).then((res) => {
      setEvents(res.data);
    });

    axios.get(`${backend_url}targets`).then((res) => {
      setTargets(res.data);
    });
  }, [product]);

  // states fro cretae new product

  const [name, setName] = useState(product?.name);
  const [nameRu, setNameRu] = useState(product?.name_ru);
  const [nameEN, setNameEn] = useState(product?.name_en);
  const [code, setCode] = useState(product?.code);
  const [description, setDescription] = useState(product?.description);
  const [descriptionRu, setDescriptionRu] = useState(product?.description_ru);
  const [descriptionEn, setDescriptionEn] = useState(product?.description_en);
  const [price, setPrice] = useState(product?.price);
  const [category, setCategory] = useState(product?.category?.name);
  const [event, setEvent] = useState(product?.event?.name);
  const [target, setTarget] = useState(product?.target?.name);
  const [fromAge, setFromAge] = useState(product?.fromAge);
  const [toAge, setToAge] = useState(product?.toAge);
  const [stock, setStock] = useState(product?.stock);
  const [files, setFiles] = useState([]);

  const editProduct = async () => {

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
      .put(`${backend_url}products/${id}`, formData, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
      .then((el) => {
        alert("greate")
       
      })
      .catch((err) => {
        alert("something went wrong!");
      });
  };

  const onFormLayoutChange = ({ disabled }) => {
    //setComponentDisabled(disabled);
  };

  if (!product) {
    return " pleas wait";
  }
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Ապրանքի թարմացում"
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
                      <Input
                        onChange={(el) => setName(el.target.value)}
                        defaultValue={product?.name}
                      />
                    </Form.Item>

                    <Form.Item label="название">
                      <Input
                        onChange={(el) => setNameRu(el.target.value)}
                        defaultValue={product?.name_ru}
                      />
                    </Form.Item>

                    <Form.Item label="title">
                      <Input
                        onChange={(el) => setNameEn(el.target.value)}
                        defaultValue={product?.name_en}
                      />
                    </Form.Item>
                    <Form.Item label="Կատեգորիա">
                      <Select
                        onChange={(el) => setCategory(el)}
                        defaultValue={product?.category?.name}
                      >
                        {categories.map((item) => (
                          <Select.Option value={item?.name}>
                            {item?.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="իրադարձություն"
                      defaultValue={product?.event?.name}
                    >
                      <Select onChange={(el) => setEvent(el)}>
                        {events.map((item) => (
                          <Select.Option value={item?.name}>
                            {item?.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item label="թիրախ">
                      <Select
                        onChange={(el) => setTarget(el)}
                        defaultValue={product?.target?.name}
                      >
                        {targets.map((item) => (
                          <Select.Option value={item?.name}>
                            {item?.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item label="կոդ">
                      <InputNumber
                        onChange={(el) => setCode(el)}
                        defaultValue={product?.code}
                      />
                    </Form.Item>

                    <Form.Item label="Սկսած Տարեկանից">
                      <InputNumber
                        onChange={(el) => setFromAge(el)}
                        defaultValue={product?.fromAge}
                      />
                    </Form.Item>

                    <Form.Item label="Մինջև Տարեկան">
                      <InputNumber
                        onChange={(el) => setToAge(el)}
                        defaultValue={product?.toAge}
                      />
                    </Form.Item>

                    <Form.Item label="Քանակ(պաշար)">
                      <InputNumber
                        onChange={(el) => setStock(el)}
                        defaultValue={product?.stock}
                      />
                    </Form.Item>

                    <Form.Item label="Գին">
                      <InputNumber
                        onChange={(el) => setPrice(el)}
                        defaultValue={product?.price}
                      />
                    </Form.Item>

                    <Form.Item label="Նկարագրություն">
                      <TextArea
                        rows={4}
                        onChange={(el) => setDescription(el.target.value)}
                        defaultValue={product?.description}
                      />
                    </Form.Item>
                    <Form.Item label="описание">
                      <TextArea
                        rows={4}
                        onChange={(el) => setDescriptionRu(el.target.value)}
                        defaultValue={product?.description_ru}
                      />
                    </Form.Item>
                    <Form.Item label="description">
                      <TextArea
                        rows={4}
                        defaultValue={product?.description_en}
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
                      <Button onClick={editProduct}>Պահպանել</Button>
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

export default ProductsEdit;

import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Space,
  Pagination,
} from "antd";
import {  useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import backend_url from "../helpers/api";


const columns = [
  {
    title: "Անվանում",
    dataIndex: "name",
    key: "name",
    width: "10%",
  },
  {
    title: "Կոդ",
    dataIndex: "code",
    key: "code",
  },

  {
    title: "Կատեգորիա",
    key: "category",
    dataIndex: "category",
  },
  {
    title: "Արժեք",
    key: "price",
    dataIndex: "price",
  },

  {
    title: "Թարմացնել",
    key: "edit",
    dataIndex: "edit",
  },
];


function Products() {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  const [loading, setLoading] = useState(false);
  const [pageNum, changePageNum] = useState(1);
  const [total, getTotalPages] = useState(null)


  const onChange = (page) => {
    changePageNum(page);
  };

  const [products, setProducts] = useState([]);

  const fetchData = (pageNum) => {
    setLoading(true);
    axios
      .get(`${backend_url}products?take=10&page=${pageNum}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setLoading(false);
        getTotalPages(res.data.meta.itemCount)
        const arr = [];
        res.data.data.map(function(item, index){
          return arr.push({
            name: item.name,
            key: index,
            id: item.id,
            code: item.code,
            category: item?.category?.name,
            price: item?.price,
            edit: (
              <Space size="middle">
                <NavLink to={`/admin/edit-product/${item.id}`}>
                  {" "}
                  Թարմացնել
                </NavLink>
              </Space>
            ),
            // delete: (
            //   <Space size="middle">
            //       <Button onClick={deleteProduct} id={item.id}>
            //         <DeleteOutlined />
            //       </Button>
            //   </Space>
            // )
          });
        });

        setProducts(arr);
      });
  };

  useEffect(() => {
    fetchData(pageNum);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum]);

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <NavLink to="/admin/add-product">
              <span
                className="icon"
                style={{
                  background: page === "products" ? "color" : "",
                }}
              ></span>
              <Button>
                {" "}
                <span className="label">Ավելացնել Նոր Ապրանք</span>
              </Button>
            </NavLink>
            <Card
              bordered={true}
              className="criclebox tablespace mb-24"
              title="Ապրանքներ"
            >
              <div className="table-responsive">
                <Table onChange={(e) => changePageNum(e.current)}
                  columns={columns}
                  dataSource={products}
                  pagination={false}
                  loading={loading}
                  className="ant-border-space"
                />
              </div>
              <Pagination className="paginationPart" onChange={onChange} current={pageNum} total={total} />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Products;

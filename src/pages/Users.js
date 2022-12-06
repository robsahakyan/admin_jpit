import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Avatar,
  Typography,
  Space,
} from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import backend_url from "../helpers/api";

const { Title } = Typography;

const columns = [
  {
    title: "",
    dataIndex: "name",
    key: "name",
    width: "32%",
  },
  {
    title: "ստատուս",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "այլ",
    key: "about",
    dataIndex: "about",
  },
];

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);

    axios
      .get(`${backend_url}users`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setLoading(false);
        const arr = [];
        res.data.map(function(item, index) {
          return arr.push({
            key: index,
            name: (
              <>
                <Avatar.Group>
                  <Avatar
                    className="shape-avatar"
                    shape="square"
                    size={40}
                    src={`${item.image ?  "/app/images/" + item.image : "" }`}
                  ></Avatar>
                  <div className="avatar-info">
                    <Title level={5}>{item.fullName}</Title>
                    <p>{item.email}</p>
                  </div>
                </Avatar.Group>{" "}
              </>
            ),
            status: item.status,
            function: (
              <>
                <div className="author-info">
                  <Title level={5}>Tester</Title>
                  <p>Developer</p>
                </div>
              </>
            ),
            about: (
              <Space size="middle">
                <NavLink to={`/admin/users/${item.id}`}>
                  <Button>
                    Տեսնել ավելին
                  </Button>
                </NavLink>
               
              </Space>
            ),

            employed: (
              <>
                <div className="ant-employed">
                  <span>14/04/17</span>
                  <a href="#pablo">Edit</a>
                </div>
              </>
            ),
          });
        });

        setUsers(arr);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Oգտատերեր"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={users}
                  pagination={true}
                  loading={loading}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Users;

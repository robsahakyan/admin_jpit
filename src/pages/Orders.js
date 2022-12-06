import { SearchOutlined } from "@ant-design/icons";
import { Row, Col, Card, Table, Space, Button, Input } from "antd";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Highlighter from "react-highlight-words";
import { NavLink } from "react-router-dom";
import backend_url from "../helpers/api";

function Orders() {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };


  const getColumnSearchProps = (target, dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              console.log(selectedKeys)
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text : ''}
        />

      ) : (
        text
      ),
  });





  const columns = [
    {
      title: "օգտատեր",
      dataIndex: "user",
      key: "user",
      width: "32%",
      ...getColumnSearchProps('email', 'user')
    },
    {
      title: "գործարք",
      key: "paymentMethod",
      dataIndex: "paymentMethod",
      filters: [
        {
          text: 'կանխիկ',
          value: 'կանխիկ',
        },
        {
          text: 'անկանխիկ',
          value: 'անկանխիկ',
        }
      ],
      onFilter: (value, record) => record.paymentMethod === value
    },
    {
      title: "վիճակ",
      key: "status",
      dataIndex: "status",
      filters: [
        {
          text: 'IN PROGRESS',
          value: 'IN PROGRESS',
        },
        {
          text: 'COMPLETED',
          value: 'COMPLETED',
        }
      ],
      onFilter: (value, record) => record.status === value
    },
    {
      title: "Արժեք",
      key: "summary",
      dataIndex: "summary",
    },
    {
      title: "այլ",
      key: "about",
      dataIndex: "about",
    },
  ];

  //const data = [];

  //const onChange = (e) => console.log(`radio checked:${e.target.value}`);
  //const { pathname } = useLocation();
  //const page = pathname.replace("/", "");

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${backend_url}orders`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const arr = [];
        res.data.map(function (item, index) {
          return arr.push({
            user: item.user.email,
            key: index,
            id: item.id,
            paymentMethod: item.paymentMethod === "FOR_PAYPAL" ? "անկանխիկ" : "կանխիկ",
            summary: item.summary,
            status: item.status || "IN PROGRESS",
            about: (
              <Space size="middle">
                <NavLink to={`/admin/orders/${item.id}`}>
                  <Button>
                    Տեսնել ավելին
                  </Button>
                </NavLink>
               
              </Space>
            ),
          });
        })
        setOrders(arr);
      });
  }, []);

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Պատվերների ցանկ"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={orders}
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

export default Orders;

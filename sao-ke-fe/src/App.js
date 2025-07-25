import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Grid,
  Avatar,
  Pagination,
} from "@mui/material";

// Không cần import logo nếu dùng từ public

function App() {
  const [creditFrom, setCreditFrom] = useState("");
  const [creditTo, setCreditTo] = useState("");
  const [debitFrom, setDebitFrom] = useState("");
  const [debitTo, setDebitTo] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 20; // Số dòng mỗi trang

  // Hàm xử lý tìm kiếm (bạn cần chỉnh lại backend để nhận các tham số này nếu muốn)
  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("Đã nhấn tìm kiếm");
    setLoading(true);
    try {
      const params = {};
      if (name) params.name = name;
      if (creditFrom) params.amount = creditFrom;
      if (content) params.content = content;

      const API_URL = process.env.REACT_APP_API_URL;
      const res = await axios.get(`${API_URL}/query`, { params });
      setResults(res.data);
      setPage(1); // Reset về trang đầu khi có kết quả mới
    } catch (err) {
      alert("Lỗi khi gọi API!");
    }
    setLoading(false);
  };

  const paginatedResults = results.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const pageCount = Math.ceil(results.length / rowsPerPage);

  return (
    <Box sx={{ background: "#f5f6fa", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          background: "#b71c1c",
          color: "#fff",
          py: 2,
          px: 2,
          borderRadius: "0 0 10px 10px",
          mb: 4,
        }}
      >
        <Container maxWidth="md" sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src="/logo.png"
            alt="Logo"
            sx={{ width: 64, height: 64, mr: 2, bgcolor: "#fff" }}
            variant="circular"
          />
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", letterSpacing: 1 }}
            >
              CharityFundsTracker
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
              Tra cứu ủng hộ, sẻ chia yêu thương
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Card Form */}
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            background: "#f3f4f6",
            mb: 4,
          }}
        >
          <Typography
            variant="h5"
            align="center"
            sx={{ fontWeight: "bold", color: "#b71c1c", mb: 3 }}
          >
            TRA CỨU SAO KÊ
          </Typography>
          <form onSubmit={handleSearch}>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} md={6}>
                <Typography fontWeight="bold" mb={1}>
                  Số tiền truy vấn từ thẻ tín dụng (Credit)
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <TextField
                      label="Từ"
                      value={creditFrom}
                      onChange={(e) => setCreditFrom(e.target.value)}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Đến"
                      value={creditTo}
                      onChange={(e) => setCreditTo(e.target.value)}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography fontWeight="bold" mb={1}>
                  Số tiền truy vấn từ thẻ ghi nợ (Debit)
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <TextField
                      label="Từ"
                      value={debitFrom}
                      onChange={(e) => setDebitFrom(e.target.value)}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Đến"
                      value={debitTo}
                      onChange={(e) => setDebitTo(e.target.value)}
                      fullWidth
                      size="small"
                      type="number"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Nội dung giao dịch"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  fullWidth
                  size="small"
                  placeholder="Nhập nội dung giao dịch"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Tên người gửi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  size="small"
                  placeholder="Nhập tên người gửi"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                background: "#d32f2f",
                fontWeight: "bold",
                fontSize: 18,
                py: 1.2,
                mt: 2,
                "&:hover": { background: "#b71c1c" },
              }}
              disabled={loading}
            >
              Tìm kiếm
            </Button>
          </form>
        </Paper>
        {/* Kết quả sẽ hiển thị ở đây */}
        {results.length > 0 ? (
          <Box mt={4}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: 4,
              }}
            >
              <Box p={0}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 0,
                    background: "#b71c1c",
                    color: "#fff",
                    py: 2,
                    textAlign: "center",
                    letterSpacing: 1,
                  }}
                >
                  KẾT QUẢ TRA CỨU
                </Typography>
                <Box sx={{ overflowX: "auto", background: "#fff" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f3f4f6" }}>
                        <th style={{ padding: 12, fontWeight: 600 }}>
                          Ngày giờ
                        </th>
                        <th style={{ padding: 12, fontWeight: 600 }}>
                          Số giao dịch
                        </th>
                        <th style={{ padding: 12, fontWeight: 600 }}>Credit</th>
                        <th style={{ padding: 12, fontWeight: 600 }}>Debit</th>
                        <th style={{ padding: 12, fontWeight: 600 }}>
                          Chi tiết
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedResults.map((row, idx) => (
                        <tr
                          key={idx}
                          style={{
                            background: idx % 2 ? "#f9f9f9" : "#fff",
                            transition: "background 0.2s",
                          }}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.background = "#ffeaea")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.background =
                              idx % 2 ? "#f9f9f9" : "#fff")
                          }
                        >
                          <td style={{ padding: 10 }}>{row.date_time}</td>
                          <td style={{ padding: 10 }}>{row.trans_no}</td>
                          <td style={{ padding: 10 }}>{row.credit}</td>
                          <td style={{ padding: 10 }}>{row.debit}</td>
                          <td style={{ padding: 10 }}>{row.detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
                {pageCount > 1 && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    py={2}
                    sx={{ background: "#fff" }}
                  >
                    <Pagination
                      count={pageCount}
                      page={page}
                      onChange={(_, value) => setPage(value)}
                      color="primary"
                      shape="rounded"
                      sx={{
                        "& .MuiPaginationItem-root": {
                          color: "#b71c1c",
                          fontWeight: "bold",
                        },
                        "& .Mui-selected": {
                          backgroundColor: "#b71c1c !important",
                          color: "#fff !important",
                        },
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Paper>
          </Box>
        ) : (
          <Typography align="center" sx={{ mt: 4, color: "#888" }}>
            Không có kết quả
          </Typography>
        )}
      </Container>
    </Box>
  );
}

export default App;

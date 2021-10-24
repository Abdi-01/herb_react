import { Card, CardMedia, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function CustomItem(props) {
  return (
    <Box>
      <Card variant="outlined" sx={{ paddingRight: 3, paddingLeft: 3 }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          py={2}
        >
          <Box display="flex" alignItem="center">
            <CardMedia
              component="img"
              image={props.image}
              sx={{
                height: 50,
                width: 50,
                objectFit: "contain",
              }}
              alt="Product"
            />

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              width={190}
              ml={2}
            >
              <Typography fontSize={14}>{props.name}</Typography>
              <Box display="flex" justifyContent="space-between">
                <Typography fontSize={14}>
                  Dose: {props.dose} {props.unit}
                </Typography>
                <Typography fontSize={14} fontWeight={500}>
                  Rp. {props.priceperunit * props.dose}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default CustomItem;

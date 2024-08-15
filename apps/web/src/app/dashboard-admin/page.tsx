"use client"
import { Box, Heading, Flex, Text, Button, VStack, HStack, SimpleGrid, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import SidebarAdmin from "@/components/dashboard-admin/SidebarAdmin";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const DashboardAdmin = () => {
    const [adminName, setAdminName] = useState("Admin");

    useEffect(() => {
        setAdminName("Admin");
    }, []);

    console.log(Cookies.get("token"))

    return (
        <Flex height="100vh">
            <SidebarAdmin />
            <Box flex="1" p={8}>
                <Flex direction="column" align="center" justify="center" height="100%">
                    <Heading mb={20} color="primary">Welcome, {adminName}!</Heading>
                    
                    <SimpleGrid columns={{ sm: 2, md: 4 }} spacing={4} mb={20} maxW="container.lg">
                        <Stat>
                            <StatLabel>Total Products</StatLabel>
                            <StatNumber>120</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel>Total Cashiers</StatLabel>
                            <StatNumber>15</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel>Recently Added</StatLabel>
                            <StatNumber>5 Products</StatNumber>
                        </Stat>
                        <Stat>
                            <StatLabel>Pending Reviews</StatLabel>
                            <StatNumber>3 Tasks</StatNumber>
                        </Stat>
                    </SimpleGrid>

                    <VStack align="center" spacing={4}>
                        <Heading size="md" color="secondary">Recent Activity</Heading>
                        <Text>Product ABC edited by you</Text>
                        <Text>New cashier JAneregistered</Text>
                    </VStack>
                </Flex>
            </Box>
        </Flex>
    );
};

export default DashboardAdmin;

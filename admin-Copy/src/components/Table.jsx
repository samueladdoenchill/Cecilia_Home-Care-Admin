import { Table } from "@mantine/core";
import { formatNumber, getInitials } from "../utils";
import moment from "moment";

export const RecentPostTable = ({ data, theme }) => {
    const tableData = data?.map((el) => (
      <Table.Tr
        key={el?._id}
        className={theme ? "text-gray-400" : "text-slate-600"}
      >
        <Table.Td className='flex gap-2 items-center'>
          <img
            src={el?.img}
            alt={el?.title}
            className='w-10 h-10 rounded-full object-conver'
          />
  
          <>
            <p className='text-base'>{el?.title}</p>
            <span className='text-[10px] text-rose-600'>{el?.cat}</span>
          </>
        </Table.Td>
        <Table.Td>{formatNumber(el?.views.length)}</Table.Td>
        <Table.Td>{moment(el?.createdAt).fromNow()}</Table.Td>
      </Table.Tr>
    ));
  
    return (
      <Table highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Submission TIme</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Message</Table.Th>
          </Table.Tr>
        </Table.Thead>
        {data?.length === 0 && <Table.Caption>No Data Found.</Table.Caption>}
        <Table.Tbody>{tableData}</Table.Tbody>
      </Table>
    );
  };
  
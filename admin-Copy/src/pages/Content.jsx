import {
  Button,
  Menu,
  Pagination,
  Table,
  useMantineColorScheme,
} from "@mantine/core";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useStore from "../store";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useAction, useContent, useDeletePost } from "../hooks/post-hook";
import { formatNumber, updateURL } from "../utils";
import clsx from "clsx";
import { Toaster, toast } from "sonner";
import { AiOutlineEye, AiOutlineSetting } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import moment from "moment";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Loading from "../components/Loading";
import ConfirmDialog from "../components/ConfirmDialog";

const Contents = () => {
  const { colorScheme } = useMantineColorScheme();

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [visible, { toggle }] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);

  const { user } = useStore();

  const { data, isPending, mutate } = useContent(toast, toggle, user?.token);
  const useDelete = useDeletePost(toast, user?.token);
  const useActions = useAction(toast, user?.token);

  const [selected, setSelected] = useState("");
  const [type, setType] = useState(null);
  const [status, setStatus] = useState(null);
  const [page, setPage] = useState(searchParams.get("page") || 1);

  const theme = colorScheme === "dark";

  const fetchContent = async () => {
    updateURL({ page, navigate, location });
    mutate(page);
  };


  const handlePerformAction = (val, id, status) => {
    setSelected(id);

    setType(val);
    setStatus(status);

    open();
  };

  const handleActions = () => {
    switch (type) {
      case "delete":
        useDelete.mutate(selected);
        break;
      case "status":
        useActions.mutate({ id: selected, status });
        break;
    }

    fetchContent();
    close();
  };

  useEffect(() => {
    fetchContent();
  }, [page]);

  return (
    <>
      <div className='w-full h-full flex flex-col'>
        <p
          className={clsx(
            "text-lg pb-1 font-semibold",
            theme ? "text-white" : "text-black"
          )}
        >
          Contents ({" "}
          <span>
            {data?.data?.length * data?.page +
              " of " +
              data?.totalPost +
              " records"}
          </span>
          )
        </p>

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

          <Table.Tbody>
            {data?.data?.length > 0 &&
              data.data.map((el) => (
                <Table.Tr
                  key={el._id}
                  className={theme ? "to-gray-400" : "to-slate-600"}
                >
                  <Table.Td className='flex gap-2 items-center'>
                    <img
                      src={el?.img}
                      alt={el?.title}
                      className='w-10 h-10 rounded-full object-conver'
                    />

                    <p className='text-base'>{el?.title}</p>
                  </Table.Td>

                  <Table.Td>{el?.cat}</Table.Td>

                  <Table.Td>
                    <div className='flex gap-1 items-center'>
                      <AiOutlineEye size={18} />
                      {formatNumber(el?.views?.length)}
                    </div>
                  </Table.Td>

                  <Table.Td>
                    <div className='flex gap-1 items-center cursor-pointer'>
                      <MdOutlineDeleteOutline size={18} className='text-slate-500' />
                      {formatNumber(el?.comments?.length)}
                    </div>
                  </Table.Td>

                  <Table.Td>{moment(el?.createdAt).fromNow()}</Table.Td>

                  <Table.Td>
                    <span
                      className={`${
                        el?.status
                          ? "bg-green-700 text-white"
                          : "bg-red-700 text-white"
                      } ${
                        colorScheme === "dark"
                          ? "bg-opacity-30"
                          : "bg-opacity-70"
                      } rounded-full  font-semibold px-4 py-1.5`}
                    >
                      {el?.status === true ? "Active" : "Disabled"}
                    </span>
                  </Table.Td>

                  <Table.Td width={5}>
                    <Menu
                      transitionProps={{
                        transition: "rotate-right",
                        duration: 150,
                      }}
                      shadow='lg'
                      width={200}
                    >
                      <Menu.Target>
                        <Button>
                          <BiDotsVerticalRounded
                            className={
                              colorScheme === "dark"
                                ? "text-white text-lg"
                                : "text-slate-900 text-lg"
                            }
                          />
                        </Button>
                      </Menu.Target>

                      <Menu.Dropdown>
                        <Menu.Item
                          leftSection={<AiOutlineSetting />}
                          onClick={() =>
                            handlePerformAction("status", el?._id, !el?.status)
                          }
                        >
                          {el?.status ? "Disable" : "Enable"}
                        </Menu.Item>

                        <Menu.Divider />

                        <Menu.Label>Danger zone</Menu.Label>

                        <Menu.Item
                          color='red'
                          leftSection={<MdOutlineDeleteOutline />}
                          onClick={() => handlePerformAction("delete", el?._id)}
                        >
                          Delete Post
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>

        <div className='w-full mt-5 flex items-center justify-center'>
          <Pagination
            total={data?.numOfPage}
            siblings={1}
            defaultValue={data?.page}
            withEdges
            onChange={(value) => setPage(value)}
          />
        </div>

        <Loading visible={isPending} />
        <Toaster richColors />
      </div>

      <ConfirmDialog
        message='Are you sure you want to perform this action?'
        opened={opened}
        close={close}
        handleClick={handleActions}
      />
    </>
  );
};

export default Contents;

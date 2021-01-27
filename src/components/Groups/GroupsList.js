import React from 'react';
import {List,Avatar, Card} from 'antd';
import {  ROUTE } from "../../routes/constant";
import {Link} from 'react-router-dom';

const data = [
    {
      name: 'Group Awesome',
    },
    {
      name: 'Group Failature',
    },
    {
      name: 'Group Meme',
    },
    {
      name: 'Grouping',
    },
  ];

class GroupsList extends React.Component {

    render() {
        return(
            <Card className="w-50 mt-2">
                <List
                    itemLayout = "horizontal"
                    dataSource = {data}
                    renderItem = { item => (
                        <List.Item>
                            <List.Item.Meta
                            avatar={<Avatar/>}
                            title={<Link to={`${ROUTE.FRIENDS.GROUPS.CHAT}`}>Go to Group Chat</Link>}
                            description="description of the groups"
                            />
                        </List.Item>
                    )}
                >
                </List>
            </Card>
        );
    }
}
export default GroupsList;
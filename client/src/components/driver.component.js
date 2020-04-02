import React, {Component} from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export default class driverProfile extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      password: '',
    }

  }

  onChangeUserPassword(e) {
    this.setState({password: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()

    const userObj = {
      // name: this.state.name,
      // email: this.state.email,
      // tel: this.state.tel,
      password: this.state.password,
      // role: this.state.role
    };

    const id = localStorage.getItem('id');
    axios.put('http://localhost:4000/api/users/'+ id, userObj)
     
      .then((res) => {
        console.log(res.data)
        
        console.log('user successfully updated')
      })
      .catch(err => console.log("SERVER ERROR TO CLIENT:", err))
     
    this.setState({ password: ''})

    console.log(`User successfully changed password!`);
    console.log(`Password: ${this.state.password}`);
  }

  render() {
    return (
    <div className="form-wrapper">
      <h2>Hello driver!</h2>
      <Col xs={6} md={4}>
        <Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAACE1BMVEX/YmL/////DydWNAxtRxH/xhv+4Yf/7bXoz4kXKVYSEUn80Ijdq2JJSUgVIVESD0j/XV0zMzP34qb/V1f/AAD/UlL/W1tnRguqUD2fKRpPNQv/ACH/Vlb+5Yj/2Gb/ZmVZNgDxw3tlQA/+fGrbsGT4Uj4NJ1kKDksAAEf/5+f/WWD/ABv8z4b/cHD/zs7/k5M+QEVxSQj/2dn/8fH/n5//v7//rq7/enr/jY2vnmqwjjPWv3htZ1PLoSxiOQBHJQtSMAz/uLgkJy7/qqr/i22Cbz3Zqyg4P0puYUGunmlST0X/zhpkPABLLh//pYnCto//iXj/zqJGNglFFwD+rnf/qjv/wSX/ilP+wH3/bF/+sXh8Vw9jQx00MUgrHT1KOTfus3uhmHv5Yk/8Qz7mx4H/JjhWPixILSFRMRUxITcbFkQ6JTBmSjP+oXP/vmX/tDL/nkf/gFT/iFb/lU3/pCCbjWOKdTr/XCYnNUz/bif/uSL/kyX/Ribkv1neqRC6nFaBWw+YbxKvgxPdMCeKTCR3MBGLLRS7VEBBKSplTEtbLzF0KzCWUlKWJy6vVlWQi4KuIi3LHCtmXF4XNTRRSliQgmvFsX7h06iyqpFxZmHCuJlIRDz/vZcLFSdeWEf+46WPQ1teQlxtEkHKU15MEkWnETncWlWQcVfDpXlZR1BmMRKIb1fCt6+nmIvc19R6XT1ACQAZp9vsAAATEElEQVR4nM3d+38URbYA8J48zAOSTJiZBs1kWwObmUyYZDKTZBITIK9rXOIuK0EEScCsiCyEBa+G5Xr3ysq64n1yl2sSwd11Xe+iSxL0T9yq7pmeflR1nVNdHTkffyDgR/vLqapTVd1drcWij1JxYHp0eHCsXM7nDc3I58vlscHh0ZGBYmkX/u9alP/xUnFkuGzoqURC1+PxuFYL8pOuJxIp3SgPj0QLjUpYGpgt66l0Qne6WBHXE+mUXp4diIoZhbA0MmgkxDaPM2EMjkShVC4szuZTCQzOwUyk8rNF1RekVjgwmEjrUrpq6OnE4IDSa1IoHBjUJZPnTaWuEqlK2DcbT6vgVZDp+GyfoitTIxwpp8I1Tn/oqfKIkmtTICyNqmmd3iCtdVTB4Bpa2DeYUJ2+WuiJwdCNNaSwbywVRfpqEU+NhTSGEvaNKRxduMZ0OGMIYSnq/NnG1FiI/igvnN2F/NnG9OyuC0fi0Y0vrNDjsrVDTtiXT+yqj0YiL9cdpYTDu9QB3RFPDe+SsKjtbgOtha5JrDzwwuHUD+SjIZFGrLBo/FAJtEI3sL0RKRz9IRNoRWo0QmGpvPtDqD8SZVT9xwiL8R9iCPVHPI4ZcBDCp6CFViM1HYVwLB3ysnLOCPnfSo8pF5byIcZQKjo7N3ft1Btnzvzq+vXXbtx47913jVBQPQ/tjEBhn3QXzOWMuWtnDndX40eNZiwsLDRev/H6WWllPA4sGzDhgFwLJVc/9wbFPVOLirDqPP3a65okMg0bb0DCEakxhvDOuHU+oaW8/t5ZKWMKtNyACKclgLnc3JlnvDqmkCIbr/+zJoEEDakAoQQwZ1x7xpc9vtBE3pBIJIQoFuLLYM54g8PjCynyNbwRMIUTCtHAQF+QUMooJoqE2Caa004F+YKF1GggjcKGKhBiR9HcNebwAhaSeA9LFIyowUIkMHf2sMAHEC6cfhdnFBADhUUk8JrQBxAS4w0kMbD0Bwn7UKvBnCFOIExI0ogbcRJBE7ggIeovMjcn6oFwITG+jkujnDCPmWzn3gD5oEIyqGKI8byMcAy1XDoDBEKFjQvXMf97nb9e5AqnUcsJUBdECRsbTxuIC0hzKz9PiBpGDVgXRAobGzHjDXdA5QhLmCZqgHlIYeNZxFXonEU/R4gZZQRAa2lv//pHZBlR6WlmKCPGyxjhLKYSCvrguBnNJnBifPz2iy8eMS/+wxfNCBaeRlxHgn2PkSnEdMKcANg9XyBxa4L+W91r9If5fzIT99It+gfzgnb6QeiuyBQi/uKEdbC70EZiviKkPxQqwnn6BwWBEFUXDahwED7M5OZEo2hIIZndwIX6IEw4gCkUAl94YWMjojCnGM/DMYSIYTQnnsp0z1eENBzCBVMo7Ick3k8hSj9EOIwohcI2SoSTZvxkgsYa+dXLL998icaLL5shFi78Gt4Vdf8dVJ+wDzWOCoHVejg5T+LWOKmHCwtHbtEf2iD10IzTdfBLSvkWUj4hotaLhxlHJs1O95NuOqc5Yjbc4wBbJYn/Aif6Vxle4Qii1oNSqEDY+EHd2+CumPDuaXiFmDXhQfh8O5xw4TddcGI8WDiLGGbAi96acFxS+K91XW9BifpskLCEWRQiGikRmlO0qpD+0AYXkrEGQUyXAoRjmEZqwFPoCNTqyU5iHSFCy2J8jC/EVApUNwwt/A0lpoFEd8VwCVEphJR7ZcJf11EicJx3J9Ep7MPd6d1NIc0hCWAG0n0cIS6Fu95KacCuzJVEhxDXC8lYKgOUEzZWgHVvwy7N2RMdwkHk4xaAhYUq4ftVIbDyxwdZwhL6mbXgZtrtiNrvXvy3D2mcPm03QMDs226kYGKixBCOoh8JYiSxJrp46NDt27dv3rx57lxDQ8MrR6vx/LFaTNX3NJz77W8/unPnzhHK5i027BTWQSu/PsoQSjx2aLhlhDVBWDfPNbxCRK/QaPBFT70rpsyoiOt7zn1058hLH5qpZfRCiwiq/LpfiFlU2FFpp93PTJiwo6bLrwoQ1vvApnU/pZ72tVE4sbbEsIVlmce6cgdN4ASVBcOAQhd18UNT6AHSyi8m1vaHq0JsqagS6X3t7ttQHlxoKj9aaFz4wOsDVn67YFSFmN0Zt/FUd2TCOwtk3cQM8XXZOzZVofzTv7mzZyaiER576X1fC4UT427hQJgHuHMH90ciPPk7ng9SFhMDLiF2PuOJiIRcIIRYnddUhCFfooADMcL6ACGg8utOYahGSuJjeBIRwt8HCcVlsdJMNRWNVDvAEA7VoqGnZ4nE6urqpUuXfmrG5ctT9c/bwQQ+90mgUEisNFNNRSPV7u53uRp6llYvXbhQWCbR0tLS64z2jCuuXDl//vwvr3766TtVc034bLBQuK2h14TFsC8a3N1vynqWLl2Yp6iKpoUR7R2trugg4eAS7DuXLenJPwiEdV3BmbEeBNdClXs7DpCEtfBZAUKPtmo9f/WqoJGaEdi7rKJvCvNhgZpRaBHRAEKHNdN6FQAUVP58VVhS8LrPv7fNw4wQYUfmynLnf4CEgdsaqVJFKLVw8gnbYEax0PR1dv4nSBhY+c0llKagVtD4rzbzVm9Ltj2csCObNX2dnf8NEgYSzXpBhZjnx3jxP6aw7fjmvd5MIDJwpMlmsw82TF/n//0vTBg4uTEsIX4LihFfm8DCSlNT08MHrZl2bnvlCjOEd//b5ubmtRlTKKwVNpFf+elNGi38lM2MR5Zws8mMh/dasq3sVDKFNHmt98ebzdiwhG9DhQFEOnHTcPcM+WE+VHK8yY7NnfuZLCOXvopPc5f9bH2j2Q6rlXaBhfxtDXovUZPcofFE7md2I3XE5ucPPuvNZlrbHdCqsMOiZbPLD1YcOhov0yR+8S6CyKv8dLdGk9pG9MWrTfQmb+FEkz82H35+7/5nLWSikqWzlawd7fcfrI97cGaYHXGy+QWEkFf5E1SooN7nXm1qWinUuiEzNkk8fPjw85WVlQ0SDFk1aEecWWtufrM/NJHUfE3BQBP/OQGcoMIAYDX2BdAqMUGF9K/gF/CGyimLZKjRYtOhBxqawqZNdcJmKpxoxiWRTdSniVDBjMa89LZCoU2ZcOYL8xeIVsqu/GRWo4UfSs1GSjri5Pq6IuHk5J/XzF/8GDOessoiGUy18HO2+M8AMJTQjoMYIZNoxLTwc7YIhXMoIavyJ0qa5A2Lp1LI2NZI9WnF0DnMPT1Cf1lMFLXwy9/KSBOFEFEQOcTEgBa+HGoHIxO+hQZ6n9PUpzUFK4tcZEJ8Cr2VXx/VhsMXfHNOE4UQNTFlE+PDmoIpDWowxQhx5dAmOic38UFNxepQi0go46tzV/54WSsrAOb+GInwmkwj9RLLWvj9bhJGJEJJX53rOU1FQkTRhwvx5d4Rdt/LqxEihlOwUGogrUVNqGI7GEOECt8Mk8G62g0NRT4NPtoAhadCAh1lUZkx9/NXm/b9UZhKofDNUxeb3/xFuCbqIBoKsxinB7DlQwvf6icRNoMm0az8hqKRxg5hYxUJT4XPnk2kZVHVWFoLUWkUCeG3K2DEvJI5jTMCSuPmyvrK5r6Nrck1/n7wnLoUUmJaUzNrc0XcQXL6Vo7Tt50KKzMzneSfNSerBr6o0kdDL6tYW3iEtSX/Ztv6CVO5eWK9ULDuoVr3Pwlycnxiorl5YmNtcqYmlFjUB0fXoIr1oSd0R8V4MENl5qtqVhSOz3TaSJrNmT99MRHFMFOJ/rKKNb43nIPNiTYbR32FlX1rf7KNJtPZXlX7iHBMxT6NN9xbUycmzRzSeLBCx9KJtS9mKtH5Z1d/VN5GiXBQwV6bP7xFcfMEjc1atZjYGF9bW/PePJReDwYJpxXsl7KI/Mkbvx6GXEywIzmiYM+bGRLCCHxEWFRw34IVce4eKlf4lvpOSIUlBfeemJHjbYTzhBGMMjS6VNw/5BA5szeO8GAUnZAuodTcA8YQ2UK101GHMKfkPj6KyBRGlEFaDpU8i8ElsvoiS6hgRc+JJH1SIaJywSMyhNEBSbGgz0SFfYw9IA7u2ScWHvpxZMC6pLLn2rjCw18KhBf3RigkQ6m6ZxM5wj2H9wQKD+2NUthfVvd8KVe457A7jS7hC3v3RipMjlrPCEfXEanQY9zn8UUrLKp7zjtISI17vvQILx7auzdyYZfCZ/WDhdRIkF/uM4UXL9Z4kQr7cwrftxAJK8rDe17Y640IhcMK35mBCM3YTSHthqree3o6hXUK3117KoX9ZXXvHz6dwuSIundIn1JhSd17wCGFEW1g5BS+y82Ov7R8BRHu/arjr1EIk6MK38dnhfGX3pb2zwDC5Wxr618jSKPVSBWdqcCKr+mbQH6iT0iBrZm/KQdWGqmSczGYYVRec/ISvUITSELlvV8zktMuYYizTTjAryovc7XfeiFIWAW2/r9yYcwtVFz0ja/tt9V6Wza4wttXqkDl7bQ/7xEq3Y8yHt11vHfYm13nCL/JZhxvIv6Bf1iLRCQHPEJVuzUEd6Bh//6hZedbla23vmUIv13OOt627Dj/3MmTjz95VhGT7tB4hKGXUAbBfdyznwQ9H+OS6+XR3oxtrAq/WXYlsDXzjnkWBmFOEWbocad/2CcMVxJJ5mycdQKI5+XY3tb2++sbFeHtb/6edftaO1odR34QZn3IbCZjfiH+zL0q7uMGF84SFnxvANNjTVpuLdO3mrMZ7/vOmaueI1zMbP5eltlfZgilbiQ+OuDHWbHEeV+93YezhJeZR9Q8d/K5T2SQyT6GED+vMR59zNaxminvXe7qOMM+hYcqTz4Gv5pvpzAXYwmxBeNR4NlJQxfYSWQLM58GHad08jEyj8kiU4g8CfouP39WoITcFFaMovOGXNGVirGFqHOEhYdfuUtisDDzS4Gw/mTwsVieFA5whJgkAk73ugQ6RckS/lQAJN0RTnSlUPY8b8jxZeyxhiXsuCJKIYroSqHcmewG6/Qyv5A51rCEvmLIJkIOjqpzD6Q+IfAmzV3YAXTMksgUTgGA9YDDv6wUFgOEsHuJBvCEPeZYwxAGFEMPEZRCz7e7JL5vYYDPEGQ1U4bQmnSraqfJUrAQsMR4BD8kEdhKgcDA8z5toPdbOvjvzMBTyGymfqG4GCKSWFsXcoXCigHthTRW/c2UIWROujlJFKbQ900r/PeegAOplURADkHF0E6iYDjt93+QlPWRq+BAnFXKKok+YfCk2ysUlP1+Bsf/W4LvriGArJLoF8KKIaiZVvdIBcLgb+chRtIG1ljjO+sLWgwrwqDRtJ/1eUD09w9xQv/02ysEF0OxsIvRRiW+YQmakjpCkEPnDhQkgg6m9Y+jXGHQd0iRQl8z9Qhhk26Q0DtdCxQG7A9jc+gtiV4hohgGC/21PlDI/x4wVugtiW4hqhgGC5OcD6yjv+mMFnpKoluIKoaBwqT3m3kiYWyUs1TECr0l0ZNDJJArTHI/PY7+tjpa6BlrXMIO+KQ7WOhZ18OEnFUGWugpiS4hYAcKJOSNMgJhSZFwiCtEjzMcYZd31QsUxvpYVVFCON/LEWKLIU+Y5H05XiRkDqh4oXuscQmRxZAj5A6jYmFsxE+UEA5xWily0s0TJtnfVIcJGUQZobMkOoToYsgU+jZmcMLYtJcoIWzoYQs78Cn0C5Osr41jhLHRVHihsyTWhIgdKL6QX+nBQi9RRugsiQ4huhj6hWIgQOhpqFLCBkYOJYqhTyhsojChe7iREjqeW7CFmasSQLdQNMiAhS6iXA6XGELUDhRLKCgTGGHM8dK+nLA21thnsksUQ7cwuNAjhbG+eDyc0C6JVSFyB8on7AqcquGFsVJeDyOsPbdgt1KpFNrC/rc5S3ppIVkvpsMI7WZaEUoVw5owmRJfMFpYKYyyOayWxKoQP+l2CAFlUEYYK+pxeeGQK4dyxbAi7GJt3isRks6YkBdWxhpLKDPprgrhXRAvjMVm07LCakmsCCWBRJhkb/yqEsaKBxBf5HQncbkmxO9AVWPqWVgVlBfGYltHJYlWMzWFUpNuGour6OvFC2PbRyXTaOdQepz5fht/uRJC2TRazZQKJXagzARuBWypqRXGnjTIpNEsiaZQphhOTUkkUFoYi+1INNWhSg6lJt3f35O8UllhrLR1dAgrpGMNEUoUw8WtJ7IXKi0kTfU7rHHJEsKfgbLi+cVVaV8oId5Ix5r2DuSkm/jkOqAKIdpIxhoiRBXDkL7QQmLcwow5NIeYYhiqfSoSEuP6Y6iRNNN2+A7U1Pfy44tSIYmdBmBjXe1th+5ALdbvyBR4X6gRWo0VgBxqaQcVw6nFrZDdzw5VQhLb34mRQxfaxTtQU4uratJnhkIhmQUQpKC5LrULUniM8BT0vlooFcYocutoYCovBCaPNE512bNCtZDGkx2Sylc442sPN3fHFCevElEIaTzZXl96TJi+bHqFz5NFw+L39evbUehoRCU048n2zncknTShtrWnBjt27Nji4urqvchwZkQqrMST7e2dnZ2t75Z6bOHl1Xv37m1vK+90jPgHABTS3+pB31QAAAAASUVORK5CYII=" rounded />
      </Col>
      <Form onSubmit={ this.onSubmit }>

        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={this.state.password} onChange={this.onChangeUserPassword}/>
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Change password
        </Button>
      </Form>
    </div>);
  }
}
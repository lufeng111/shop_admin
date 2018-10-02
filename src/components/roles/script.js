export default {
  data() {
    return {
      rolesList: [],
      roleEditDialog: false,
      roleEditForm: {
        id: -1,
        roleName: '',
        roleDesc: ''
      },
      // 分配权限对话框的展示和隐藏
      rightsDialog: false,
      // 一进入页面就获取所有的权限（树形结构）
      rightsTree: [],
      defaultProps: {
        // child 用来指定使用那个属性来指定子节点
        children: 'children',
        // label 用来指定使用数据中的那个属性展示属性控制中每个节点的名字
        label: 'authName'
      },
      // 当前分配权限的角色id
      curRoleId: -1
    }
  },

  created() {
    this.getRolesList()
    this.getAllRightsTree()
  },

  methods: {
    /**
     * 获取到所有的权限树形结构数据
     */
    async getAllRightsTree() {
      const res = await this.$http.get('/rights/tree')
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.rightsTree = data
      }
    },

    /**
     * 获取角色列表数据
     */
    async getRolesList() {
      const res = await this.$http.get('./roles')
      console.log(res);
      const { data, meta } = res.data
      if (meta.status === 200) {
        this.rolesList = data
      }
    },
    /**根据角色id删除角色
     * @param {number}id 要删除角色的ids
     */

    async delRolesById(id) {
      try {
        // 等待用户点击确定或取消按钮
        await this.$confirm('确认删除该角色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })

        // console.log('点击确定删除');
        // 发送请求，删除当前角色
        const res = await this.$http.delete(`/roles/${id}`)
        if (res.data.meta.status === 200) {
          const index = this.rolesList.findIndex(item => item.id === id)
          this.rolesList.splice(index, 1)
        }
      } catch (err) {
        // console.log('点击取消');
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      };


      //   this.$confirm('确认删除该角色吗?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(async () => {
      //   // 发送请求，删除当前角色
      //   const res = await this.$http.delete(`/roles/${id}`)
      //   if (res.data.meta.status === 200) {
      //     const index = this.rolesList.findIndex(item => item.id === id)
      //     this.rolesList.splice(index, 1)
      //   }
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   });
      // });
    },
    /**
     * 展示修改角色对话框
     */
    showRoleEditDialog(curRole) {
      this.roleEditDialog = true
      // 获取到当前角色的数据
      for (const key in this.roleEditForm) {
        this.roleEditForm[key] = curRole[key]
      }
    },
    /**
     * 修改角色信息
     */
    async editRole() {
      const { id, roleName, roleDesc } = this.roleEditForm
      const res = await this.$http.put(`/roles/${id}`, {
        roleName,
        roleDesc
      })
      // console.log(res);
      const { data, meta } = res.data
      if (meta.status === 200) {
        // 关闭对话框
        this.roleEditDialog = false
        // 更新列表数据
        const editRole = this.rolesList.find(item => item.id === id)
        editRole.roleName = data.roleName
        editRole.roleDesc = data.roleDesc
      }
    },
    /**
     *删除指定角色的权限
     * @param {number} roleId 角色id
     * @param {number} rightId 权限id
     */
    async delRoleRightById(roleId, rightId) {
      // console.log('删除', roleId, rightId);
      const res = await this.$http.delete(`roles/${roleId}/rights/${rightId}`)
      console.log(res);
      const { data, meta } = res.data
      if (meta.status === 200) {
        const curRole = this.rolesList.find(item => item.id === roleId)
        curRole.children = data
      }
    },

    showRightsDialog(curRoleRights, id) {
      // 展示对话框
      this.rightsDialog = true
      // 暂存当前角色id
      this.curRoleId = id
      // setCheckedKeys
      // console.log(this.$refs.rightsTree);
      // console.log(this.$refs);
      // this.$refs.rightsTree.setCheckedKeys([144]);
      this.$nextTick(() => {
        // 三级菜单id数组
        const level3Ids = []
        curRoleRights.forEach(level1 => {
          level1.children.forEach(level2 => {
            level2.children.forEach(level3 => {
              level3Ids.push(level3.id)
            })
          })
        })
        // console.log(this.$refs.rightsTree);
        // 指定选中节点的id数组
        this.$refs.rightsTree.setCheckedKeys(level3Ids)
      })
    },

    /**
     * 给角色分配权限
     */
    async assignRights() {
      // 获取到当前角色选中的权限id数组
      // 获取全选项
      const checkedKeys = this.$refs.rightsTree.getCheckedKeys()
      // 获取半选项
      const halfCheckedKeys = this.$refs.rightsTree.getHalfCheckedKeys()
      // 将全选项的和半选项的合并到一起
      const allCheckedIds = [...checkedKeys, ...halfCheckedKeys]
      // console.log(allCheckedIds);
      const res = await this.$http.post(`/roles/${this.curRoleId}/rights`, {
        rids: allCheckedIds.join(',')
      })
      // console.log(res);
      if (res.data.meta.status === 200) {
        this.rightsDialog = false
        // 注意：需要重新获取角色列表数据
        this.getRolesList()
      }
    }
  }
}


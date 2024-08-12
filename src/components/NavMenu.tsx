"use client"
import { routes } from "@/routes";
import { Button, Container, Drawer, IconButton, Link, List, ListItem, ListItemButton, ListItemContent, Modal, ModalClose, Sheet, Stack, useTheme } from "@mui/joy";
import NavLink from "next/link";
import Logo from "./Logo";
import { usePathname, useRouter } from "next/navigation";
import { Bars2Icon } from "@heroicons/react/16/solid";
import { useState } from "react";

function NavMenu() {
    const pathname = usePathname()
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    return (
        <>
            <Container
                sx={{backdropFilter: 'blur(4px)', position: 'fixed', zIndex: theme.zIndex.modal - 1, display: { sm: 'none' } }}
            >
                <Stack height={64} direction='row' alignItems='center' >
                    <IconButton
                        onClick={() => setOpen(o => !o)}
                        color='neutral'
                    >
                        <Bars2Icon height={18} />
                    </IconButton>
                </Stack>
            </Container>
            <Drawer slotProps={{ content: { sx: { bgcolor: 'transparent', boxShadow: 'none', p: 1 } } }} open={open} anchor='top' onClose={() => setOpen(o => !o)}>
                <Sheet sx={{ border: 1, borderRadius: 'sm', borderColor: theme.palette.divider, boxShadow: theme.shadow['sm'] }}>
                    <List>
                        <ListItem sx={{ marginBottom: 2 }}>
                            <ListItemContent sx={{ justifyContent: 'space-between', alignItems: 'center', display: "flex" }}>
                                <Stack>
                                    <NavLink href={'/'} onClick={() => setOpen(o => !o)}>
                                        <Logo />
                                    </NavLink>
                                    <ModalClose />
                                </Stack>
                            </ListItemContent>
                        </ListItem>
                        {routes.map((item) => {
                            const NavItemLink = item.type === 'route' ? NavLink : Link;
                            return (
                                <ListItem key={item.title}>
                                    <ListItemButton
                                        onClick={() => setOpen(o => !o)}
                                        selected={pathname.includes(item.route)}
                                    >
                                        <NavItemLink style={{ textDecoration: 'none', width: '100%' }} target={item.type === 'link' ? '_blank' : undefined} href={item.route}>
                                            <ListItemContent
                                                sx={(theme) => ({
                                                    textDecoration: 'none',
                                                    ...theme.typography['body-lg'],
                                                    fontFamily: (theme) => theme.fontFamily.display,
                                                    lineHeight: 3
                                                })}
                                            >
                                                {item.title}
                                            </ListItemContent>
                                        </NavItemLink>
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Sheet>

            </Drawer>
        </>
    )
}

export default NavMenu;